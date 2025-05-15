cmake_minimum_required(VERSION 3.10)

project (main)

# Set cross compiler
set(CMAKE_SYSTEM_NAME Linux)
set(CMAKE_SYSTEM_PROCESSOR aarch64)
set(CMAKE_C_COMPILER /opt/linaro/gcc-linaro-7.5.0-2019.12-x86_64_aarch64-linux-gnu/bin/aarch64-linux-gnu-gcc)
set(CMAKE_CXX_COMPILER /opt/linaro/gcc-linaro-7.5.0-2019.12-x86_64_aarch64-linux-gnu/bin/aarch64-linux-gnu-g++)

if(CPPTEST_COVERAGE)
    include("${CMAKE_CURRENT_LIST_DIR}/cmake/cpptest-coverage.cmake")
endif()

include(FetchContent)

FetchContent_Declare(
    googletest
    URL https://github.com/google/googletest/archive/release-1.11.0.zip
    # SOURCE_DIR /home/dx/src/googletest
)

FetchContent_MakeAvailable(googletest)
add_executable(main main.cpp)
# target_link_libraries(main gtest)
target_link_libraries(main gtest gtest_main)
