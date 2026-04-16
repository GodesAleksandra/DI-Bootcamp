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

all_cats = [bengal_obj, chartreux_obj, siamese_obj]

bengal_obj = {"name": "Alice", "age": 2}
chartreux_obj = {"name": "Baby", "age": 1}
siamese_obj = {"name": "Monika", "age": 5}

sara_pets = Pets(all_cats)
sara_pets.walk()