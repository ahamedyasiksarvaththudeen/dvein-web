@echo off
cd /d "D:\Dvein proj\update 6\web-dvein-2"

echo Attempting direct push...
git push origin main > git_result.txt 2>&1

echo Git log:
git log --oneline -3 >> git_result.txt 2>&1
echo --- >> git_result.txt 2>&1
git status >> git_result.txt 2>&1

echo Done. See git_result.txt
pause
