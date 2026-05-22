@echo off
cd /d "D:\Dvein proj\update 6\web-dvein-2"
echo === GIT LOG (last 3 commits) === > git_status.txt
git log --oneline -3 >> git_status.txt
echo. >> git_status.txt
echo === GIT STATUS === >> git_status.txt
git status >> git_status.txt
echo. >> git_status.txt
echo === REMOTE === >> git_status.txt
git remote -v >> git_status.txt
echo Done. Check git_status.txt
