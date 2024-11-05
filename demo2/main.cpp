#include <iostream>
#include <gtest/gtest.h>

int counter;

int addnum(int a, int b)
{
    if (a == b) {
        return 2*a;
    }
    return a + b;
}

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

#if 1
int main(int argc, char *argv[])
{
   std::cout << "*** demo2 ***" << std::endl;
   testing::InitGoogleTest(&argc, argv);
   return RUN_ALL_TESTS();
   // return 0;
}
#endif
