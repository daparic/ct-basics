### Setup PATH for `cpptestcc` & `cpptestcov`
```
export CPPTEST_HOME=/opt/parasoft/cpptest_ct-2024.2.0-linux.x86_64/ # needed by cmake
export PATH=$CPPTEST_HOME:$CPPTEST_HOME/bin:$PATH
```

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
# Set cross compiler C/C++ paths
export CC=/opt/linaro/gcc-linaro-7.5.0-2019.12-x86_64_aarch64-linux-gnu/bin/aarch64-linux-gnu-gcc
export CXX=/opt/linaro/gcc-linaro-7.5.0-2019.12-x86_64_aarch64-linux-gnu/bin/aarch64-linux-gnu-g++

cd demo2
cmake -B build -S . -DCPPTEST_COVERAGE=1
ls -l build/cpptest-runtime/
cmake --build build/
ls -l build/main

# Copy instrumented binary to target. Execute in remote target. Copy back the .clog file
scp build/main <user>@<remote target ipaddr>:.
ssh <user>@<remote target ipaddr> /remote/path/main
scp <user>@<remote target ipaddr>:/symmetrical-path-location/build/cpptest-coverage/main/main.clog build/cpptest-coverage/main/

cpptestcov compute -map=build/cpptest-coverage/main/.cpptest/cpptestcc -clog=build/cpptest-coverage/main/main.clog -coverage="LC,SC,BC,DC,SCC,MCDC,FC,CC" -out=outdir
ls -l outdir/
cpptestcov report html outdir/
firefox coverage.html 2>/dev/null
```

- [Native Compile Code Coverage](https://www.youtube.com/watch?v=epgsssq8vXc)
- [Cross Compile Code Coverage](https://youtu.be/RIhKa1qzmCk?feature=shared)
- https://asciinema.org/a/HlW8PPLnnGyyPxEWbheQdZOwl
