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