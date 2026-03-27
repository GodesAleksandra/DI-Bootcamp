#Ask the user for their birthdate (specify the format, for example: DD/MM/YYYY).
#Display a little cake as seen below:
#The number of candles on the cake should be the last number of the users age, if they are 53, then add 3 candles.
#Bonus : If they were born on a leap year, display two cakes !

birthdate = input("Please enter your birthdate (DD/MM/YYYY)")

year = int(birthdate.split("/")[-1])
age = 2026-year

if (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0):
    is_leap_year = 1
else:
    is_leap_year = 0

last_digit = int(str(age)[-1])

cake = f"""    ___"""+'i'*last_digit+"""___
      |:H:a:p:p:y:|
    __|___________|__
   |^^^^^^^^^^^^^^^^^|
   |:B:i:r:t:h:d:a:y:|
   |                 |
   ~~~~~~~~~~~~~~~~~~~"""

print(cake)

if is_leap_year == 1:
    print(cake)