def hello():
    f = open("C:/Users/bhanupratap/Documents/github-action/chat-app/temp.csv", 'x')
    f.write('hello, there')
    f.close()

if __name__ == '__main__':
    hello()