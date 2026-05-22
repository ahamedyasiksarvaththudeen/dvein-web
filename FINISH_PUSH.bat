@echo off
cd /d "D:\Dvein proj\update 6\web-dvein-2"

echo Setting editor to bypass prompts...
set GIT_EDITOR=true

echo Finishing rebase...
git rebase --continue

echo.
echo Pushing to main...
git push origin main

echo.
echo === FINAL LOG ===
git log --oneline -3 > git_status.txt
git status >> git_status.txt
echo Push complete! Check GitHub.
pause
