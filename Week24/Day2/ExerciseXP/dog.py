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