/*Exercise 1 : Find the numbers divisible by 23
Create a function call displayNumbersDivisible() that takes no parameter.
In the function, loop through numbers 0 to 500.
Console.log all the numbers divisible by 23.
At the end, console.log the sum of all numbers that are divisible by 23.
Outcome : 0 23 46 69 92 115 138 161 184 207 230 253 276 299 322 345
368 391 414 437 460 483
Sum : 5313

Bonus: Add a parameter divisor to the function.
displayNumbersDivisible(divisor)
Example:
displayNumbersDivisible(3) : Console.log all the numbers divisible by 3,
and their sum
displayNumbersDivisible(45) : Console.log all the numbers divisible by 45,
and their sum
*/

function displayNumbersDivisible(divisor) {
    let sum = 0;
    for (let i=0; i < 501; i++) {
        if (i % divisor === 0) {
            console.log(i);
            sum += i;
        }
    }
    console.log("Sum: " + sum);
}

displayNumbersDivisible(23);
displayNumbersDivisible(3);
displayNumbersDivisible(45);

/* Exercise 2 : Shopping List
Add the stock and prices objects to your js file.
Create an array called shoppingList with the following items: “banana”, “orange”, and “apple”.
It means that you have 1 banana, 1 orange and 1 apple in your cart.
Create a function called myBill() that takes no parameters.

The function should return the total price of your shoppingList. In order to do this you must follow these rules:
The item must be in stock. (Hint : check out if .. in)
If the item is in stock find out the price in the prices object.
Call the myBill() function.
Bonus: If the item is in stock, decrease the item’s stock by 1*/

const stock = {
    "banana": 6,
    "apple": 0,
    "pear": 12,
    "orange": 32,
    "blueberry":1
}

const prices = {
    "banana": 4,
    "apple": 2,
    "pear": 1,
    "orange": 1.5,
    "blueberry":10
}


function myBill() {
    let shoppingList = ["banana", "orange", "apple"];
    let total_price = 0;
    for (let x in shoppingList) {
        for (let y in stock) {
            if (shoppingList[x] == y && stock[y] > 0) {
                stock[y] -= 1;
                total_price += prices[y];
            }
        }
    }
    console.log(stock);
    console.log(total_price);
}

myBill();

/*Exercise 3 : What’s in my wallet ?
Create a function named changeEnough(itemPrice, amountOfChange) that receives two arguments :
an item price
and an array representing the amount of change in your pocket.
In the function, determine whether or not you can afford the item.
If the sum of the change is bigger or equal than the item’s price (ie. it means that you can afford the item), the function should return true
If the sum of the change is smaller than the item’s price (ie. it means that you cannot afford the item) the function should return false
Change will always be represented in the following order: quarters, dimes, nickels, pennies.
A quarters is 0.25
A dimes is 0.10
A nickel is 0.05
A penny is 0.01
4. To illustrate:
After you created the function, invoke it like this:
changeEnough(4.25, [25, 20, 5, 0])
The value 4.25 represents the item’s price
The array [25, 20, 5, 0] represents 25 quarters, 20 dimes, 5 nickels and 0 pennies.
The function should return true, since having 25 quarters, 20 dimes, 5 nickels and 0 pennies gives you 6.25 + 2 + .25 + 0 = 8.50 which is bigger than 4.25 (the total amount due)
Examples
changeEnough(14.11, [2,100,0,0]) => returns false
changeEnough(0.75, [0,0,20,5]) => returns true
*/

function changeEnough(itemPrice, amountOfChange) {
    const coins_value = [0.25, 0.10, 0.05, 0.01];
    let sum = 0;
    let result = false;
    for (let x in amountOfChange) {
        sum += amountOfChange[x] * coins_value[x];
    }
    if (sum >= itemPrice) result = true;
    console.log(sum);
    console.log(result);
    return result;
}

changeEnough(14.11, [2,100,0,0])
changeEnough(0.75, [0,0,20,5])
changeEnough(4.25, [25, 20, 5, 0])