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