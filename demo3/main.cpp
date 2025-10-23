#include <iostream>

int main(int argc, char *argv[])
{
    if (argc == 1) {
        std::cout << "One argument passed" << std::endl;
    } else if(argc == 2) {
        std::cout << "Two arguments passed" << std::endl;
    } else {
        std::cout << "More than two arguments passed" << std::endl;
    }
    return argc;
}
