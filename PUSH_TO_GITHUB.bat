@echo off
cd /d "D:\Dvein proj\update 6\web-dvein-2"

echo Removing git lock if exists...
if exist ".git\index.lock" del /f ".git\index.lock"

echo Configuring git user...
git config user.email "prasantht2026@gmail.com"
git config user.name "Genjaku"

echo Staging changed files...
git add frontend/src/App.jsx
git add frontend/src/pages/Home.jsx
git add frontend/src/pages/SoftwareSolutions.jsx
git add "frontend/src/assets/F1.png"
git add "frontend/src/assets/F2.png"
git add "frontend/src/assets/F3.png"
git add "frontend/src/assets/Seller dash/"
git add "frontend/src/assets/ecommerce/"

echo Committing...
git commit -m "imgs chg"

echo Pushing to main...
git push origin main

echo.
echo === DONE! Check above for any errors ===
pause
