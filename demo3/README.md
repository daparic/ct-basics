 ```
 mkdir demo3
 cd demo3/
 export PATH=$CPPTEST_HOME/bin:$PATH
 vi main.cpp
 g++ main.cpp 
 g++ -c main.cpp -o main.o
 g++ -o application main.o
 ./application 

 cpptestcc -compiler gcc_13-64 -line-coverage -mcdc-coverage -exclude "regex:*" -include "regex:*.cpp" -- g++ -c main.cpp -o main.o

 find .cpptest/
 strings main.o |grep -i cpptest
 find . -type f -name '*.o'

 g++ -o application main.o /opt/parasoft/cpptest_ct-2025.1.0-linux.x86_64/runtime/build/cpptest.o 
 ./application 

 find . -type f -name '*.map'
 cpptestcov compute -map=.cpptest/cpptestcc -clog=cpptest_results.clog -out=.coverage
 cpptestcov report text .coverage/
 cpptestcov report html -coverage LC,MCDC .coverage/
 cpptestcov index .coverage/
 code .
 ```
