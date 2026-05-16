"""
GET  /api/public/jobs
GET  /api/public/slides
GET  /api/public/services
GET  /api/public/trainings
GET  /api/public/products
GET  /api/public/training-page
POST /api/public/apply   (multipart - resume upload + email)
"""
import os
import shutil
from typing import Optional
from fastapi import APIRouter, Depends, File, Form, UploadFile
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders

from database import get_db

router = APIRouter()


def _doc(d: dict) -> dict:
    d["_id"] = str(d["_id"])
    return d


@router.get("/jobs")
async def get_jobs(db=Depends(get_db)):
    jobs = await db["jobs"].find().sort("createdAt", -1).to_list(None)
    return [_doc(j) for j in jobs]


@router.get("/slides")
async def get_slides(db=Depends(get_db)):
    slides = await db["slides"].find().to_list(None)
    return [_doc(s) for s in slides]


@router.get("/services")
async def get_services(db=Depends(get_db)):
    services = await db["services"].find().to_list(None)
    return [_doc(s) for s in services]


@router.get("/trainings")
async def get_trainings(db=Depends(get_db)):
    trainings = await db["trainings"].find().to_list(None)
    return [_doc(t) for t in trainings]


@router.get("/products")
async def get_products(db=Depends(get_db)):
    products = await db["products"].find().to_list(None)
    return [_doc(p) for p in products]


@router.get("/training-page")
async def get_training_page():
    return {
        "domains": [
            {
                "_id": 1,
                "title": "Full Stack Mafia",
                "iconName": "FaLayerGroup",
                "color": "text-blue-600",
                "desc": "Dominate the web. MERN Stack, Next.js, and System Design.",
                "skills": ["React", "Node.js", "MongoDB", "AWS"],
            },
            {
                "_id": 2,
                "title": "AI Architects",
                "iconName": "FaBrain",
                "color": "text-purple-600",
                "desc": "Build the brain. Python, TensorFlow, LLMs, and Neural Networks.",
                "skills": ["Python", "PyTorch", "OpenAI API", "HuggingFace"],
            },
            {
                "_id": 3,
                "title": "Cloud Commanders",
                "iconName": "FaCloud",
                "color": "text-indigo-600",
                "desc": "Scale to infinity. Docker, Kubernetes, Terraform, and CI/CD.",
                "skills": ["AWS", "Docker", "K8s", "Linux"],
            },
        ],
        "curriculum": {
            "web": [
                {"_id": 1, "week": "Week 1-2", "title": "The Foundation",        "desc": "Javascript V8 Engine internals, Async architecture, and DOM manipulation."},
                {"_id": 2, "week": "Week 3-5", "title": "Backend Engineering",   "desc": "Building scalable APIs with Node.js, Express, and Database Design patterns."},
                {"_id": 3, "week": "Week 6-8", "title": "Frontend & Deployment", "desc": "Advanced React hooks, Redux, Next.js SSR, and deploying to AWS EC2."},
            ],
            "ai": [
                {"_id": 1, "week": "Week 1-2", "title": "Python & Maths",         "desc": "Advanced Python structures, NumPy, Pandas, and Linear Algebra for ML."},
                {"_id": 2, "week": "Week 3-5", "title": "Machine Learning Ops",   "desc": "Supervised Learning, Scikit-learn, and model evaluation metrics."},
                {"_id": 3, "week": "Week 6-8", "title": "Deep Learning & LLMs",  "desc": "Neural Networks, Transformers, and building RAG applications."},
            ],
        },
        "projects": [
            {"_id": 1, "title": "AI-Powered SaaS",  "tag": "Full Stack", "desc": "Build a subscription-based SaaS platform integrated with OpenAI API."},
            {"_id": 2, "title": "Crypto Exchange",   "tag": "Web3",       "desc": "Real-time trading engine with WebSockets and high-frequency data handling."},
            {"_id": 3, "title": "Autonomous Agents", "tag": "AI/ML",      "desc": "Create AI agents that can browse the web and perform tasks automatically."},
        ],
        "faqs": [
            {"_id": 1, "question": "Is this beginner friendly?",        "answer": "Yes, but be ready to work hard. We start from zero but move fast."},
            {"_id": 2, "question": "Do you provide placement support?", "answer": "We have 50+ hiring partners. If you clear our assessments, we refer you directly."},
            {"_id": 3, "question": "What is the duration?",             "answer": "The internship cohort runs for 8 weeks intense training + 4 weeks live project."},
        ],
    }


@router.post("/apply")
async def apply_job(
    firstName: str = Form(...),
    lastName:  str = Form(...),
    email:     str = Form(...),
    phone:     str = Form(...),
    jobTitle:  str = Form(...),
    portfolio: Optional[str] = Form(None),
    resume:    Optional[UploadFile] = File(None),
    db=Depends(get_db),
):
    resume_path: Optional[str] = None

    if resume and resume.filename:
        os.makedirs("uploads", exist_ok=True)
        safe_name = f"{os.urandom(4).hex()}_{resume.filename}"
        save_path = os.path.join("uploads", safe_name)
        with open(save_path, "wb") as f:
            shutil.copyfileobj(resume.file, f)
        resume_path = f"uploads/{safe_name}"

    from datetime import datetime
    await db["applications"].insert_one({
        "firstName":  firstName,
        "lastName":   lastName,
        "email":      email,
        "phone":      phone,
        "portfolio":  portfolio,
        "jobTitle":   jobTitle,
        "resumePath": resume_path,
        "status":     "Pending",
        "appliedAt":  datetime.utcnow(),
    })

    _send_application_email(firstName, lastName, email, phone, portfolio, jobTitle, resume_path)

    return {"success": True, "message": "Application Submitted Successfully!"}


def _send_application_email(first, last, email, phone, portfolio, job_title, resume_path):
    EMAIL_USER = os.getenv("EMAIL_USER")
    EMAIL_PASS = os.getenv("EMAIL_PASS")
    if not EMAIL_USER or not EMAIL_PASS:
        return

    try:
        msg = MIMEMultipart()
        RECIPIENT = "jayasri@dveininnovations.com"
        msg["From"]    = f"DVein Careers <{EMAIL_USER}>"
        msg["To"]      = RECIPIENT
        msg["Subject"] = f"New Internship Application Received: {job_title}"

        body = f"""
        <h3>New Internship Application</h3>
        <p><strong>Name:</strong> {first} {last}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Phone:</strong> {phone}</p>
        <p><strong>Portfolio:</strong> {portfolio or 'Not Provided'}</p>
        <p><strong>Applied For:</strong> {job_title}</p>
        <hr/>
        <p style="color:#555;font-size:12px;">This application has been automatically stored in the DVein admin panel database.</p>
        """
        msg.attach(MIMEText(body, "html"))

        if resume_path and os.path.exists(resume_path):
            with open(resume_path, "rb") as f:
                part = MIMEBase("application", "octet-stream")
                part.set_payload(f.read())
            encoders.encode_base64(part)
            part.add_header("Content-Disposition", f'attachment; filename="{os.path.basename(resume_path)}"')
            msg.attach(part)

        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(EMAIL_USER, EMAIL_PASS)
            server.sendmail(EMAIL_USER, RECIPIENT, msg.as_string())
    except Exception as e:
        print(f"Email failed: {e}")
