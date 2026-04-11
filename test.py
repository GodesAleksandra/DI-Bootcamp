myList = [10, 25, 17, 9, 30, -5]
# Filters the elements which are not multiples of 5
myList2 = filter(lambda n : n%5 == 0, myList)
print (myList2)