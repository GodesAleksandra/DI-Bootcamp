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

let shoppingList = ["banana", "orange", "apple"];

let total_price = 0;

function myBill() {
    for (let x in shoppingList) {
        //console.log(x);
        for (let y in stock) {
            if (shoppingList[x] == y && stock[y] >= 1) {
                stock[y] -= 1;
                console.log(prices[x]);
                //total_price += prices[x];
            }
        }
    }
    console.log(total_price);
}

myBill();
