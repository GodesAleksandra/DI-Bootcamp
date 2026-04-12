#Using map and filter, try to say hello to everyone who's name is less than or equal to 4 letters

people = ["Rick", "Morty", "Beth", "Jerry", "Snowball"]

def length_less_4(s):
    return len(s) <= 4

filtered_object = filter(length_less_4, people)

names_greeting = map(lambda name: print(f"Hello {name}"),filtered_object)

print(list(names_greeting))
