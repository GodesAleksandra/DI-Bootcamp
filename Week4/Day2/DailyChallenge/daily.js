/*Create an arrow function named displayGroceries, that console.logs the 3 fruits from the groceries object. Use the forEach method.
Create another arrow function named cloneGroceries:
In the function, create a variable named user that is a copy of the client variable. (Tip : make the user variable equal to the client variable)
Change the client variable to “Betty”. Will we also see this modification in the user variable ? Why ?
In the function, create a variable named shopping that is equal to the groceries variable.
Change the value of the totalPrice key to 35$. Will we also see this modification in the shopping object ? Why ?
Change the value of the paid key to false. Will we also see this modification in the shopping object ? Why ?
Invoke the cloneGroceries function.*/

let client = "John";

const groceries = {
    fruits : ["pear", "apple", "banana"],
    vegetables: ["tomatoes", "cucumber", "salad"],
    totalPrice : "20$",
    other : {
        paid : true,
        meansOfPayment : ["cash", "creditCard"]
    }
}

const displayGroceries = () => {
    groceries.fruits.forEach((fruit) => {
      console.log(fruit);
    });
}
displayGroceries();

const cloneGroceries = () => {
    let user = client;
    client = "Betty";
    console.log(user); //Output: "John" - for primitive data type JavaScript creates a separate copy of the value in memory.
    //If you modify that copy inside a function, the original variable remains untouched.

    let shopping = groceries;
    groceries.totalPrice = "35$";
    console.log(shopping.totalPrice); //Output: 35$ - when you pass an object or array, you are passing the memory address where that data is stored.
    //Because both variables point to the same location, modifying a property updates the original.
    groceries.other.paid = false;
    console.log(shopping.other.paid); //Output: false
}
cloneGroceries();
