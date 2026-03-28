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

family = {"rick": 43, 'beth': 13, 'morty': 5, 'summer': 8}
price = 0
total_price = 0
for k, v in family.items():
    if 3 <= v < 12:
        price = 10
    elif v >= 12:
        price = 15
    else:
        price = 0
    print(f"The ticket price for {k} is", price )
    total_price = total_price + price

print("Total cost is",total_price)