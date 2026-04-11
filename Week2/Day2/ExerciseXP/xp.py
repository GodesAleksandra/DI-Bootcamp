#Exercise 1: What Are You Learning?
#Goal: Create a function that displays a message about what you’re learning.
#Define a function named display_message(). This function should not take any parameters.
#Print a Message, for example: “I am learning about functions in Python.”
#Call the Function. This will execute the code inside the function and print your message.
#Expected Output: I am learning about functions in Python.

def display_message():
    print("I am learning about functions in Python.")

display_message()

#Exercise 2: What’s Your Favorite Book?
#Create a function that displays a message about a favorite book.
#Define a function named favorite_book(). This function should accept one parameter called title.
#The function needs to output a message like “One of my favorite books is <title>”.
#Call the favorite_book() function and provide a book title as an argument.
#For example: favorite_book("Alice in Wonderland").

def favorite_book(title):
    print(f"One of my favorite books is {title}")

favorite_book('"Harry Potter"')

#Exercise 3: Some Geography
#Create a function that describes a city and its country.
#Define a function named describe_city(). This function should accept two parameters: city and country.
#Give the country parameter a default value, such as “Unknown”.
#Inside the function, set up the code to display a sentence like “ is in “.
#Replace <city> and <country> with the parameter values.
#Call the describe_city() function with different city and country combinations.
#Try calling it with and without providing the country argument to see the default value in action.
#Example: describe_city("Reykjavik", "Iceland") and describe_city("Paris").
#Expected Output: Reykjavik is in Iceland. Paris is in Unknown.

def describe_city(city, country="Unknown"):
    print(f"{city} is in {country}")

describe_city("Reykjavik", "Iceland")
describe_city("Paris")

#Exercise 4: Random
#Create a function that generates random numbers and compares them.
#At the beginning of your script, use import random to access the random number generation functions.
#Create a function that accepts a number between 1 and 100 as a parameter.
#Inside the function, use random.randint(1, 100) to generate a random integer between 1 and 100.
#Compare the Numbers. If they are the same, print a success message. Otherwise, print a fail message and display both numbers.
#Call the function with a number between 1 and 100.
#Expected Output: Success! (if the numbers match)
#Fail! Your number: 50, Random number: 23 (if they don't match)

import random

def generate_random(number):
    num_random = random.randint(1, 100)
    if num_random == number:
        print("Success!")
    else:
        print(f"Fail! Your number: {number}, Random number: {num_random}")

generate_random(56)

