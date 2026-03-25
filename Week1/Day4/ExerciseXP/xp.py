#Exercise 1: Favorite Numbers
#Create a set called my_fav_numbers and populate it with your favorite numbers.
#Add two new numbers to the set.
#Remove the last number you added to the set.
#Create another set called friend_fav_numbers and populate it with your friend’s favorite numbers.
#Concatenate my_fav_numbers and friend_fav_numbers to create a new set called our_fav_numbers.
#Note: Sets are unordered collections, so ensure no duplicate numbers are added.
my_fav_numbers = {2,4,5,7,8}
my_fav_numbers.add(10)
my_fav_numbers.add(12)
my_fav_numbers.remove(12)
friend_fav_numbers = {14,15,16,18,20}
our_fav_numbers = my_fav_numbers.union(friend_fav_numbers)
print(our_fav_numbers)

#Exercise 2: Tuple
#Given a tuple of integers, try to add more integers to the tuple.
#Hint: Tuples are immutable, meaning they cannot be changed after creation. Think about why you can’t add more integers to a tuple.
tuple = (1,2,3,4,5)
tuple = tuple + (6,7,8,10)
print(tuple)
# One of the key differences between tuples and other Python data structures is that tuples are immutable.
# Once a tuple is created, its contents cannot be changed.
# You are allowed to add tuples to tuples, so if you want to add one item, (or many), create a new tuple with the item(s), and add it to the existing tuple


#Exercise 3: List Manipulation
#You have a list: basket = ["Banana", "Apples", "Oranges", "Blueberries"]
#Remove "Banana" from the list.
#Remove "Blueberries" from the list.
#Add "Kiwi" to the end of the list.
#Add "Apples" to the beginning of the list.
#Count how many times "Apples" appear in the list.
#Empty the list.
#Print the final state of the list.

basket = ["Banana", "Apples", "Oranges", "Blueberries"]
basket.remove("Banana")
basket.remove("Blueberries")
basket.append("Kiwi")
basket.insert(0, "Apples")
print(basket.count("Apples"))
basket = []
print(basket)

#Exercise 4: Floats
#Recap: What is a float? What’s the difference between a float and an integer?
#Create a list containing the following sequence of mixed types: floats and integers:
#1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5.
#Avoid hard-coding each number manually.
#Think: Can you generate this sequence using a loop or another method?

my_list = sorted(list(range(1,6)) + [x + 0.5 for x in range(1,5)])
print(my_list)

#Exercise 5: For Loop
#Write a for loop to print all numbers from 1 to 20, inclusive.
#Write another for loop that prints every number from 1 to 20 where the index is even.

for number in range(1,21):
    print(number)

for number in range(1,21):
    if number%2 ==0:
        print(number)

#Exercise 6: While Loop
#Use an input to ask the user to enter their name.
#Using a while True loop, check if the user gave a proper name (not digits and at least 3 letters long)
#hint: check for the method isdigit()
#if the input is incorrect, keep asking for the correct input until it is correct
#if the input is correct print “thank you” and break the loop

while True:
    name = input("Please enter your name: ")
    consist_digit = 0
    for n in name:
        if n.isdigit() == True:
            consist_digit = 1
            break
    if len(name) >= 3 and consist_digit == 0:
        break
print("Thank you!")

#Exercise 7: Favorite Fruits
#Ask the user to input their favorite fruits (they can input several fruits, separated by spaces).
#Store these fruits in a list.
#Ask the user to input the name of any fruit.
#If the fruit is in their list of favorite fruits, print:
#"You chose one of your favorite fruits! Enjoy!"
#If not, print:
#"You chose a new fruit. I hope you enjoy it!"

input_fav_fruits = input("Please enter your favorite fruits: ")
fruits = input_fav_fruits.split()
input_fruit = input("Please enter the name of any fruit: ")
is_fav = 0
for fruit in fruits:
    if fruit == input_fruit:
        print("You chose one of your favorite fruits! Enjoy!")
        is_fav = 1
if is_fav == 0:
    print("You chose a new fruit. I hope you enjoy it!")


#Exercise 8: Pizza Toppings
#Write a loop that asks the user to enter pizza toppings one by one.
#Stop the loop when the user types 'quit'.
#For each topping entered, print:
#"Adding [topping] to your pizza."
#After exiting the loop, print all the toppings and the total cost of the pizza.
#The base price is $10, and each topping adds $2.50.


#Exercise 9: Cinemax Tickets
#Ask for the age of each person in a family who wants to buy a movie ticket.
#Calculate the total cost based on the following rules:
#Free for people under 3.
#$10 for people aged 3 to 12.
#$15 for anyone over 12.
#Print the total ticket cost.

#Bonus:
#Imagine a group of teenagers wants to see a restricted movie (only for ages 16–21).
#Write a program to:
#Ask for each person’s age.
#Remove anyone who isn’t allowed to watch.
#Print the final list of attendees.