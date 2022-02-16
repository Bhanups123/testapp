import pandas 

def hello():
    f = open("./tempo.csv", 'x')
    f.write('hello, there')
    f.close()

if __name__ == '__main__':
    hello()