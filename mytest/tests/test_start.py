import unittest
print(sys.path)

import temp.start as start
import sys

class EnhancementTestCase(unittest.TestCase):
    def test_hello(self):
        start.hello()
        f = open('./temp.csv', 'r')
        s = f.read()
        self.assertEqual(s, 'hello, there')


if __name__ == '__main__':
    unittest.main()
