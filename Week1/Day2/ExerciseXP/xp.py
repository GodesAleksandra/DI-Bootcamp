#Exercise 1: Hello World
#Instructions
#Print the following output using one line of code:
#Hello world
#Hello world
#Hello world
#Hello world

print("Hello world\n" * 4)

#Exercise 2: Some Math
#Instructions
#Write code that calculates the result of:
#(99^3)*8 (meaning 99 to the power of 3, times 8).
print((99^3)*8 )
#768

#Exercise 3: What is the output?
#Instructions
#Predict the output of the following code snippets:
#Coment what is your guess, then run the code and compare
#Example:
#>>> 15 < 8 #False
#>>> 5 < 3 #False
#>>> 3 == 3 #True
#>>> 3 == "3" #False
#>>> "3" > 3 #error
#>>> "Hello" == "hello" #False

#False
#True
#False
#error
#False

#Exercise 4: Your computer brand
#Instructions
#Create a variable called computer_brand which value is the brand name of your computer.
#Using the computer_brand variable, print a sentence that states the following:
#"I have a <computer_brand> computer."

computer_brand = "HP"
print(f"I have a {computer_brand} computer.")

#Exercise 5: Your information
#Instructions
#Create a variable called name, and set it’s value to your name.
#Create a variable called age, and set it’s value to your age.
#Create a variable called shoe_size, and set it’s value to your shoe size.
#Create a variable called info and set it’s value to an interesting sentence about yourself. The sentence must contain all the variables created in parts 1, 2, and 3.
#Have your code print the info message.
#Run your code.

name = "Aleksandra"
age = 30
shoe_size = 36
info = f"{name} aged {age} with shoe size {shoe_size} likes to buy Kinder surprise egg."
print(info)