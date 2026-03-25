#num = int(input("Please input number between 1 and 100 "))
#if num % 5 == 0 and num % 3 == 0:
#    print("FizzBuzz")
#elif num % 3 == 0:
#    print("Fizz")
#elif num % 5 == 0:
#    print("Buzz")

#list1 = [5, 10, 15, 20, 25, 50, 20]
#ind = list1.index(20)
#list1[ind] = 200
#print(list1)

num = int(input("Enter the number: "))

for i in range(1, 20):
    print(f"{num} x {i} = {num * i}")