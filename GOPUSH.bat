@echo off
cd /d "D:\Dvein proj\update 6\web-dvein-2"

echo === Setting Python as no-op editor ===
set GIT_EDITOR=python "D:\Dvein proj\update 6\web-dvein-2\noop_editor.py"

echo === Completing rebase ===
git rebase --continue

echo.
echo === Pushing to GitHub ===
git push origin main

echo.
echo === Writing result ===
git log --oneline -3 > git_result.txt 2>&1
echo ---STATUS--- >> git_result.txt 2>&1
git status >> git_result.txt 2>&1

type git_result.txt
echo.
echo ============ ALL DONE ============
pause
