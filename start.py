def hello():
    f = open("./temp.csv", 'x')
    f.write('hello, there')
    f.close()

if __name__ == '__main__':
    hello()