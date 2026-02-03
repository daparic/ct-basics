#include <iostream>

#ifdef GTEST_ENABLE
#include <gtest/gtest.h>
#endif

int counter;

int addnum(int a, int b)
{
    if (a == b) {
        return 2*a;
    }
    return a + b;
}

#ifdef GTEST_ENABLE
TEST(TestName, Subtest_1)
{
    std::cout << counter++ << std::endl;
    ASSERT_TRUE(1 == 1);
}

TEST(TestName, Subtest_2)
{
    std::cout << counter << std::endl;
    ASSERT_FALSE(1 == 0);
}

TEST(TestName, test_addnum1)
{
    int result = addnum(4, 4);
    ASSERT_FALSE(result == 8);
}
#endif

int main(int argc, char *argv[])
{
#ifdef GTEST_ENABLE
    std::cout << "*** demo2 ***" << std::endl;
    testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
#else
    std::cout << "*** hello!!! ***" << std::endl;
    int result = addnum(3, 4);
    std::cout << "result = " << result << std::endl;
    return 0;
#endif
}
