#Challenge 1: Multiples of a Number
#1. Ask the user for two inputs:
#A number (integer).
#A length (integer).
#2. Create a program that generates a list of multiples of the given number.
#3. The list should stop when it reaches the length specified by the user.

num = int(input("Please enter a number: "))
length = int(input("Please enter a length: "))
multiples = []
for i in range(1, length+1):
    multiples.append(num * i)
print(multiples)

#Challenge 2: Remove Consecutive Duplicate Letters
#1. Ask the user for a string.
#2. Write a program that processes the string to remove consecutive duplicate letters.
#The new string should only contain unique consecutive letters.
#For example, “ppoeemm” should become “poem” (removes consecutive duplicates like ‘pp’, ‘ee’, and ‘mm’).
#3. The program should print the modified string.
#The final string will not include any consecutive duplicates, but non-consecutive duplicates are allowed.
#Example: In "recursive", the two ‘r’s and two ‘e’s are allowed because they are not consecutive.