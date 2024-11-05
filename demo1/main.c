
int addnum(int a, int b)
{
    if (a == b) {
        return 2*a;
    }
    return a + b;
}

int main(int argc, char *argv[])
{
    return addnum(3, 4);
}
