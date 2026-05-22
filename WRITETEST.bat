@echo off
cd /d "D:\Dvein proj\update 6\web-dvein-2"
echo WRITE_OK > test_write.txt
echo STEP1 >> test_write.txt
git log --oneline -1 >> test_write.txt 2>&1
echo STEP2 >> test_write.txt
git push origin main >> test_write.txt 2>&1
echo STEP3 >> test_write.txt
git status --short >> test_write.txt 2>&1
echo COMPLETE >> test_write.txt
