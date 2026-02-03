cmake_minimum_required(VERSION 3.10)

project (main)

if(CPPTEST_COVERAGE)
    include("${CMAKE_CURRENT_LIST_DIR}/cmake/cpptest-coverage.cmake")
endif()

if(GTEST_ENABLE)
    include(FetchContent)
    
    FetchContent_Declare(
        googletest
        URL https://github.com/google/googletest/archive/release-1.11.0.zip
        # SOURCE_DIR /home/dx/src/googletest
    )
    
    FetchContent_MakeAvailable(googletest)
endif()

add_executable(main main.cpp)
# target_link_libraries(main gtest)

if(GTEST_ENABLE)
    target_compile_definitions(main PRIVATE GTEST_ENABLE=1)
    target_link_libraries(main gtest gtest_main)
endif()
