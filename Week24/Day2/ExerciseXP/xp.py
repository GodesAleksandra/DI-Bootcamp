#Exercise 1: Pets
#Use the provided Pets and Cat classes to create a Siamese breed, instantiate cat objects, and use the Pets class to manage them.
#See the example below, before diving in.
#Step 1: Create the Siamese Class
#Create a class called Siamese that inherits from the Cat class.
#You can add any specific attributes or methods for the Siamese breed, or leave it as is if there are no unique behaviors.
#Step 2: Create a List of Cat Instances
#Create a list called all_cats that contains instances of Bengal, Chartreux, and Siamese cats.
#Example: all_cats = [bengal_obj, chartreux_obj, siamese_obj]
#Give each cat a name and age.
#Step 3: Create a Pets Instance
#Create an instance of the Pets class called sara_pets, passing the all_cats list as an argument.
#Step 4: Take Cats for a Walk
#Call the walk() method on the sara_pets instance.
#This should print the result of calling the walk() method on each cat in the list.

class Pets():
    def __init__(self, animals):
        self.animals = animals

    def walk(self):
        for animal in self.animals:
            print(animal.walk())

class Cat():
    is_lazy = True

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def walk(self):
        return f'{self.name} is just walking around'

class Bengal(Cat):
    def sing(self, sounds):
        return f'{sounds}'

class Chartreux(Cat):
    def sing(self, sounds):
        return f'{sounds}'

class Siamese(Cat):
    def sing(self, sounds):
        return f'{sounds}'

all_cats = [Bengal("Alice",2), Chartreux("Baby",1), Siamese("Monika",5)]

sara_pets = Pets(all_cats)
sara_pets.walk()

#Exercise 2: Dogs
#Create a Dog class with methods for barking, running speed, and fighting.
#Step 1: Create the Dog Class
#Create a class called Dog with name, age, and weight attributes.
#Implement a bark() method that returns “<dog_name> is barking”.
#Implement a run_speed() method that returns weight / age * 10.
#Implement a fight(other_dog) method that returns a string indicating which dog won the fight, based on run_speed * weight.
#Step 2: Create Dog Instances
#Create three instances of the Dog class with different names, ages, and weights.
#Step 3: Test Dog Methods
#Call the bark(), run_speed(), and fight() methods on the dog instances to test their functionality.

class Dog:
    def __init__(self, name, age, weight):
        self.name = name
        self.age = age
        self.weight = weight

    def bark(self):
        return f'{self.name}  is barking'

    def run_speed(self):
        return self.weight / self.age * 10

    def fight(self, other_dog):
        if self.run_speed() * self.weight > other_dog.run_speed() * other_dog.weight:
            return f'{self.name}  is won the fight'
        else:
            return f'{other_dog.name}  is won the fight'


dog1 = Dog("Jo", 2, 15)
dog2 = Dog("Baby", 1, 12)
dog3 = Dog("Rich", 5, 18)

print(dog1.bark())
print(dog2.run_speed())
print(dog3.fight(dog2))

#Exercise 3: Dogs Domesticated
#Goal: Create a PetDog class that inherits from Dog and adds training and tricks.
#Step 1: Import the Dog Class
#In a new Python file, import the Dog class from the previous exercise.
#Step 2: Create the PetDog Class
#Create a class called PetDog that inherits from the Dog class.
#Add a trained attribute to the __init__ method, with a default value of False.
#trained means that the dog is trained to do some tricks.
#Implement a train() method that prints the output of bark() and sets trained to True.
#Implement a play(*args) method that prints “<dog_names> all play together”.
#*args on this method is a list of dog instances.
#Implement a do_a_trick() method that prints a random trick if trained is True.
#Use this list for the ramdom tricks:
#tricks = ["does a barrel roll", "stands on his back legs", "shakes your hand", "plays dead"]
#Choose a random index from it each time the method is called.
#Step 3: Test PetDog Methods
#Create instances of the PetDog class and test the train(), play(*args), and do_a_trick() methods.

# In a new file dog.py

from dog import Dog
import random

class PetDog(Dog):
    def __init__(self, name, age, weight):
        super().__init__(name, age, weight)
        self.trained = False

    def train(self):
        print(self.bark())
        self.trained = True

    def play(self, *dog_names):
        all_dogs = ", ".join(dog_names)
        return f"{all_dogs} all play together"

    def do_a_trick(self):
        if self.trained:
            tricks = ["does a barrel roll", "stands on his back legs", "shakes your hand", "plays dead"]
            print(f"{self.name} {random.choice(tricks)}")

# Test PetDog methods
my_dog = PetDog("Fido", 2, 10)
my_dog.train()
my_dog.play("Buddy", "Max")
my_dog.do_a_trick()

#Exercise 4: Family and Person Classes
#Goal: Practice working with classes and object interactions by modeling a family and its members.
#Step 1: Create the Person Class
#Define a Person class with the following attributes:
#first_name
#age
#last_name (string, should be initialized as an empty string)
#Add a method called is_18():
#It should return True if the person is 18 or older, otherwise False.
#Step 2: Create the Family Class
#Define a Family class with:
#A last_name attribute
#A members list that will store Person objects (should be initialized as an empty list)
#Add a method called born(first_name, age):
#It should create a new Person object with the given first name and age.
#It should assign the family’s last name to the person.
#It should add this new person to the members list.
#Add a method called check_majority(first_name):
#It should search the members list for a person with that first_name.
#If the person exists, call their is_18() method.
#If the person is over 18, print: "You are over 18, your parents Jane and John accept that you will go out with your friends"
#Otherwise, print: "Sorry, you are not allowed to go out with your friends."
#Add a method called family_presentation():
#It should print the family’s last name.
#Then, it should print each family member’s first name and age.
#Once implemented, your program should allow you to:
#Create a family with a last name.
#Add members to the family using the born() method.
#Use check_majority() to see if someone is allowed to go out.
#Display family information with family_presentation().


class Person():
    def __init__(self, first_name, age, last_name):
        self.first_name = first_name
        self.age = age
        self.last_name = ""

    def is_18(self):
        if self.age >= 18:
            return True
        else:
            return False

class Family(Person):
    def __init__(self, last_name):
        #super().__init__(first_name, age)
        self.last_name = last_name
        self.members = []

    def born(self, first_name, age):
        person = Person(first_name, age, "")
        person.last_name = self.last_name
        self.members.append(person)

    def check_majority(self, first_name):
        for member in self.members:
            if member.first_name == first_name:
                if member.is_18():
                    print("You are over 18, your parents Jane and John accept that you will go out with your friends")
                else:
                    print("Sorry, you are not allowed to go out with your friends.")

    def family_presentation(self):
        print(self.last_name)
        for member in self.members:
            print(f"{member.first_name}, {member.age}")

my_family = Family("Godes")
my_family.born("Aleksandra", 18)
my_family.born("Stanislav", 20)
my_family.born("Dan", 1)
my_family.born("Nika", 12)
my_family.check_majority("Aleksandra")
my_family.check_majority("Dan")
my_family.family_presentation()