#Exercise 1: Converting Lists into Dictionaries
#You are given two lists. Convert them into a dictionary where the first list contains the keys and the second list contains the corresponding values.
#Lists:
#keys = ['Ten', 'Twenty', 'Thirty']
#values = [10, 20, 30]
#Expected Output: {'Ten': 10, 'Twenty': 20, 'Thirty': 30}

keys = ['Ten', 'Twenty', 'Thirty']
values = [10, 20, 30]

my_dict = {k: v for k, v in zip(keys, values)}

print(my_dict)

#Exercise 2: Cinemax #2
#Write a program that calculates the total cost of movie tickets for a family based on their ages.
#Family members’ ages are stored in a dictionary.
#The ticket pricing rules are as follows:
#Under 3 years old: Free
#3 to 12 years old: $10
#Over 12 years old: $15
#Family Data:
#family = {"rick": 43, 'beth': 13, 'morty': 5, 'summer': 8}
#Loop through the family dictionary to calculate the total cost.
#Print the ticket price for each family member.
#Print the total cost at the end.
#Bonus: Allow the user to input family members’ names and ages, then calculate the total ticket cost.

family = {}
while True:
    name = input("Please enter name (enter 'quit' when you are finished): ")
    if name.lower() == 'quit':
        break
    age = int(input(f"Please enter {name}'s age: "))
    family[name] = age

price = 0
total_price = 0
for k, v in family.items():
    if 3 <= v < 12:
        price = 10
    elif v >= 12:
        price = 15
    else:
        price = 0
    print(f"Ticket price for {k} is", price )
    total_price += price

print("Total cost is",total_price)


#Exercise 3: Zara
#Create and manipulate a dictionary that contains information about the Zara brand.
#Brand Information:
#name: Zara
#creation_date: 1975
#creator_name: Amancio Ortega Gaona
#type_of_clothes: men, women, children, home
#international_competitors: Gap, H&M, Benetton
#number_stores: 7000
#major_color:
#    France: blue,
#    Spain: red,
#    US: pink, green

#Create a dictionary called brand with the provided data.
#Modify and access the dictionary as follows:
#Change the value of number_stores to 2.
#Print a sentence describing Zara’s clients using the type_of_clothes key.
#Add a new key country_creation with the value Spain.
#Check if international_competitors exists and, if so, add “Desigual” to the list.
#Delete the creation_date key.
#Print the last item in international_competitors.
#Print the major colors in the US.
#Print the number of keys in the dictionary.
#Print all keys of the dictionary.
#Bonus: Create another dictionary called more_on_zara with creation_date and number_stores. Merge this dictionary with the original brand dictionary and print the result.

brand = {
                'name': 'Zara',
                'creation_date': 1975,
                'creator_name': 'Amancio Ortega Gaona',
                'type_of_clothes': ['men', 'women', 'children', 'home'],
                'international_competitors': ['Gap', 'H&M', 'Benetton'],
                'number_stores': 7000,
                'major_color':{
                    'France': 'blue',
                    'Spain': 'red',
                    'US': ['pink', 'green']}
}

brand['number_stores'] = 2
print(print(f"Zara's clients: {', '.join(brand['type_of_clothes'])}."))
brand['country_creation'] = 'Spain'
if 'international_competitors' in brand:
    brand['international_competitors'].append('Desigual')
del brand['creation_date']


print(brand)