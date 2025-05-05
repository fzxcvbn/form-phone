from itertools import *

c = 0

for s in permutations('0234567', 5):
    z = ''.join(s)
    if z[0]!='0':
        z = z.replace('7', '1').replace('5', '1').replace('3', '1').replace('2', '0').replace('4', '0').replace('6', '0')
        if ('00' not in z) and ('11' not in z):
            c+=1
print(c)