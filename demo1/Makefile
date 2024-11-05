
main: main.c
	gcc -o main main.c

main1:
	cmake -B runtime -S /opt/parasoft/cpptest_ct-2024.1.0-linux.x86_64/runtime
	cmake --build runtime
	cpptestcc -compiler gcc_13-64 \
        -line-coverage \
        -statement-coverage \
        -block-coverage \
        -decision-coverage \
        -simple-condition-coverage \
        -mcdc-coverage \
        -function-coverage \
        -call-coverage \
        -exclude "regex:*" \
        -include "regex:$(pwd)/*" \
        -exclude "regex:$(pwd)/build/*" \
        -ignore "regex:*_test.cpp" \
        -ignore "regex:$(pwd)/build/*" -- \
        gcc -o main1 main.c -Wl,--whole-archive runtime/libcpptest_static.a -Wl,--no-whole-archive

main2: runtime
	make -C runtime
	cpptestcc -compiler gcc_13-64 \
        -line-coverage \
        -statement-coverage \
        -block-coverage \
        -decision-coverage \
        -simple-condition-coverage \
        -mcdc-coverage \
        -function-coverage \
        -call-coverage \
        -exclude "regex:*" \
        -include "regex:$(pwd)/*" \
        -exclude "regex:$(pwd)/build/*" \
        -ignore "regex:*_test.cpp" \
        -ignore "regex:$(pwd)/build/*" -- \
        gcc -o main2 main.c -Wl,--whole-archive runtime/build/cpptest.o -Wl,--no-whole-archive

runtime:
	cp -av /opt/parasoft/cpptest_ct-2024.1.0-linux.x86_64/runtime .

clean:
	@rm -f main *.o main1 main2

.PHONY: clean
