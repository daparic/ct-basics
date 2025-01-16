### demo1
```
cd demo1
make main1
./main1
ls -l cpptest_results.clog
cpptestcov compute -map=.cpptest/cpptestcc -clog=cpptest_results.clog -coverage="LC,SC,BC,DC,SCC,MCDC,FC,CC" -out=outdir
ls -l outdir/
cpptestcov report html outdir/
firefox coverage.html 2>/dev/null
```
### demo2
```
cd demo2
export CPPTEST_HOME=/opt/parasoft/cpptest_ct-2024.2.0-linux.x86_64/
cmake -B build -S . -DCPPTEST_COVERAGE=1
ls -l build/cpptest-runtime/
cmake --build build/
ls -l build/main
build/main
cpptestcov compute -map=build/cpptest-coverage/main/.cpptest/cpptestcc -clog=build/cpptest-coverage/main/main.clog -coverage="LC,SC,BC,DC,SCC,MCDC,FC,CC" -out=outdir
ls -l outdir/
cpptestcov report html outdir/
firefox coverage.html 2>/dev/null
```


https://www.youtube.com/watch?v=epgsssq8vXc
