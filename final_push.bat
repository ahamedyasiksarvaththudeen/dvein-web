@echo off
title DVein - Final Push
cd /d "D:\Dvein proj\update 2\Dvein"

if exist ".git\index.lock" del /f ".git\index.lock"

git config user.email "prasantht2026@gmail.com"
git config user.name "Genjaku"

git add -A

git commit -m "feat: Hero title color #0056D2 via inline style for all 3 slides"

git push origin main

echo.
echo Push Complete!
pause
