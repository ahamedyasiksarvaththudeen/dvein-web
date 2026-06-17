"""
JSON-file database - drop-in replacement for MongoDB/motor.

All data is stored in python_backend/data/<collection>.json files.
The API mirrors motor's AsyncIOMotorDatabase so every router works
without modification (ObjectId is no longer used).
"""
import json
import re
import uuid
from pathlib import Path
from fastapi import Request


class _Cursor:
    """Supports .sort().to_list() chaining like a motor cursor."""

    def __init__(self, data: list):
        self._data = data
        self._sort_key = None
        self._sort_rev = False

    def sort(self, field, direction):
        self._sort_key = field
        self._sort_rev = (direction == -1)
        return self

    async def to_list(self, length):
        data = self._data[:]
        if self._sort_key:
            data.sort(
                key=lambda x: (x.get(self._sort_key) is None,
                               str(x.get(self._sort_key) or "")),
                reverse=self._sort_rev,
            )
        return data


class _Collection:
    """Thin async wrapper around a single JSON file."""

    def __init__(self, directory: Path, name: str):
        self._file = directory / f"{name}.json"
        if not self._file.exists():
            self._file.write_text("[]", encoding="utf-8")

    def _load(self) -> list:
        try:
            return json.loads(self._file.read_text(encoding="utf-8"))
        except Exception:
            return []

    def _save(self, data: list):
        self._file.write_text(
            json.dumps(data, indent=2, default=str), encoding="utf-8"
        )

    @staticmethod
    def _matches(doc: dict, query: dict) -> bool:
        for key, value in query.items():
            if isinstance(value, dict):
                doc_val = str(doc.get(key, ""))
                if "$regex" in value:
                    flags = re.IGNORECASE if value.get("$options", "") == "i" else 0
                    if not re.search(value["$regex"], doc_val, flags):
                        return False
                elif "$in" in value:
                    if doc.get(key) not in value["$in"]:
                        return False
            else:
                if doc.get(key) != value:
                    return False
        return True

    def find(self, query: dict = None) -> _Cursor:
        data = self._load()
        if query:
            data = [d for d in data if self._matches(d, query)]
        return _Cursor(data)

    async def find_one(self, query: dict):
        for doc in self._load():
            if self._matches(doc, query):
                return doc
        return None

    async def count_documents(self, query: dict = None) -> int:
        data = self._load()
        if not query:
            return len(data)
        return sum(1 for d in data if self._matches(d, query))

    async def distinct(self, field: str, query: dict = None) -> list:
        data = self._load()
        if query:
            data = [d for d in data if self._matches(d, query)]
        seen: set = set()
        result = []
        for d in data:
            v = d.get(field)
            if v and v not in seen:
                seen.add(v)
                result.append(v)
        return result

    async def insert_one(self, doc: dict):
        data = self._load()
        if "_id" not in doc:
            doc["_id"] = str(uuid.uuid4())
        data.append(doc)
        self._save(data)

        class _Result:
            inserted_id = doc["_id"]

        return _Result()

    async def update_one(self, query: dict, update: dict):
        data = self._load()
        for doc in data:
            if self._matches(doc, query):
                if "$set" in update:
                    doc.update(update["$set"])
                break
        self._save(data)

    async def delete_one(self, query: dict):
        data = self._load()
        for i, doc in enumerate(data):
            if self._matches(doc, query):
                data.pop(i)
                self._save(data)
                return

    async def delete_many(self, query: dict):
        data = self._load()
        data = [d for d in data if not self._matches(d, query)]
        self._save(data)

    async def find_one_and_delete(self, query: dict):
        data = self._load()
        for i, doc in enumerate(data):
            if self._matches(doc, query):
                data.pop(i)
                self._save(data)
                return doc
        return None

    async def find_one_and_update(
        self, query: dict, update: dict, return_document: bool = False
    ):
        data = self._load()
        for i, doc in enumerate(data):
            if self._matches(doc, query):
                if "$set" in update:
                    data[i].update(update["$set"])
                self._save(data)
                return data[i] if return_document else doc
        return None


class JsonDatabase:
    """Namespace that returns a _Collection per JSON file."""

    def __init__(self, directory: str = "data"):
        self._dir = Path(directory)
        self._dir.mkdir(exist_ok=True)

    def __getitem__(self, name: str) -> _Collection:
        return _Collection(self._dir, name)


def get_db(request: Request) -> JsonDatabase:
    return request.app.state.db
