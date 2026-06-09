"use strict";
/*Daily Challenge: Type Guard with Union Types
Create a function handleData that processes an array of mixed types.
The array can contain objects with different structures.
Implement type guards to handle each type of object and perform specific operations based on their structure.

Instructions:
1. Define the following types:

type User = {
 type: 'user';
 name: string;
 age: number;
};

type Product = {
 type: 'product';
 id: number;
 price: number;
};

type Order = {
 type: 'order';
 orderId: string;
 amount: number;
};


2. Create a function handleData that accepts an array of User | Product | Order. Implement type guards to:

For User objects, return a greeting message with the user’s name and age.
For Product objects, return a message with the product ID and its price.
For Order objects, return a summary of the order with its ID and amount.


3. Ensure your function handles unexpected cases gracefully.*/
function handleData(data) {
    return data.map(item => {
        if (item.type === 'user') {
            return `Hello, ${item.name}! You are ${item.age} years old.`;
        }
        else if (item.type === 'product') {
            return `Product ID: ${item.id}, Price: $${item.price.toFixed(2)}`;
        }
        else if (item.type === 'order') {
            return `Order ID: ${item.orderId}, Amount: $${item.amount.toFixed(2)}`;
        }
        else {
            throw new Error(`Unhandled type: ${item.type}`);
        }
    });
}
// Example usage:
const mixedData = [
    { type: 'user', name: 'Alice', age: 30 },
    { type: 'product', id: 101, price: 29.99 },
    { type: 'order', orderId: 'ORD123', amount: 59.99 }
];
console.log(handleData(mixedData));
