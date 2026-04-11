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

#Exercise 5: Let’s Create Some Personalized Shirts!
#Goal: Create a function to describe a shirt’s size and message, with default values.
#Define a function called make_shirt(). This function should accept two parameters: size and text.
#Set up the function to display a sentence summarizing the shirt’s size and message.
#Call the Function
#Modify the make_shirt() function so that size has a default value of “large” and text has a default value of “I love Python”.
#Call the Function with Default and Custom Values
#Call make_shirt() to make a large shirt with the default message.
#Call make_shirt() to make a medium shirt with the default message.
#Call make_shirt() to make a shirt of any size with a different message.
#Bonus: Call make_shirt() using keyword arguments (e.g., make_shirt(size="small", text="Hello!")).
#Expected Output:
#The size of the shirt is large and the text is I love Python.
#The size of the shirt is medium and the text is I love Python.
#The size of the shirt is small and the text is Custom message.

def make_shirt(size="large",text="I love Python"):
    print(f"The size of the shirt is {size} and the text is {text}")

make_shirt()
make_shirt('medium')
make_shirt('extra large','Peace!')
make_shirt(size="extra small", text="Happy Birthday!")

#Exercise 6: Magicians…
#Goal: Modify a list of magician names and display them in different ways.
#Create a list called magician_names with the given names: ['Harry Houdini', 'David Blaine', 'Criss Angel']
#Create a function called show_magicians() that takes the magician_names list as a parameter.
#Inside the function, iterate through the list and print each magician’s name.
#Create a function called make_great() that takes the magician_names list as a parameter.
#Inside the function, use a for loop to iterate through the list and add “the Great” before each magician’s name.
#Call make_great() to modify the list.
#Call show_magicians() to display the modified list.
#Expected Output:
#Harry Houdini the Great
#David Blaine the Great
#Criss Angel the Great

magician_names = ['Harry Houdini', 'David Blaine', 'Criss Angel']

def show_magicians(magician_names):
    for name in magician_names:
        print(name)

def make_great(magician_names):
    for i in range(len(magician_names)):
        magician_names[i] += ' the Great'

make_great(magician_names)
show_magicians(magician_names)

#Exercise 7: Temperature Advice
#Goal: Generate a random temperature and provide advice based on the temperature range.
#Create a function called get_random_temp() that returns a random integer between -10 and 40 degrees Celsius.
#Create a function called main(). Inside this function:
#Call get_random_temp() to get a random temperature.
#Store the temperature in a variable and print a friendly message like:
#“The temperature right now is 32 degrees Celsius.”
#Inside main(), provide advice based on the temperature:
#Below 0°C: e.g., “Brrr, that’s freezing! Wear some extra layers today.”
#Between 0°C and 16°C: e.g., “Quite chilly! Don’t forget your coat.”
#Between 16°C and 23°C: e.g., “Nice weather.”
#Between 24°C and 32°C: e.g., “A bit warm, stay hydrated.”
#Between 32°C and 40°C: e.g., “It’s really hot! Stay cool.”


Step 4: Floating-Point Temperatures (Bonus)

Modify get_random_temp() to return a random floating-point number using random.uniform() for more accurate temperature values.


Step 5: Month-Based Seasons (Bonus)

Instead of directly generating a random temperature, ask the user for a month (1-12) and determine the season using if/elif conditions.
Modify get_random_temp() to return temperatures specific to each season.


Expected Output:

The temperature right now is 32 degrees Celsius.
It's really hot! Stay cool.

Below 0°C: e.g., “Brrr, that’s freezing! Wear some extra layers today.”
Between 0°C and 16°C: e.g., “Quite chilly! Don’t forget your coat.”
Between 16°C and 23°C: e.g., “Nice weather.”
Between 24°C and 32°C: e.g., “A bit warm, stay hydrated.”
Between 32°C and 40°C: e.g., “It’s really hot! Stay cool.”

import random

def get_random_temp():
    random.randint(-10, 40)

def main():
    random_temp = get_random_temp()
    print(f"The temperature right now is {random_temp} degrees Celsius.")