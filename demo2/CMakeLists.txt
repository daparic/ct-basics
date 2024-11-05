cmake_minimum_required(VERSION 3.10)

project (main)

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
