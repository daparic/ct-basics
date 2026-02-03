#!/bin/sh
#

export PATH=$CPPTEST_HOME/bin:$PATH
make main1
./main1
ls -l cpptest_results.clog
cpptestcov compute -map=.cpptest/cpptestcc -clog=cpptest_results.clog -coverage="LC,SC,BC,DC,SCC,MCDC,FC,CC" -out=outdir
ls -l outdir/
cpptestcov report html outdir/
firefox coverage.html 2>/dev/null
