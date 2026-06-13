/*Exercise 1: Multiple Exports and Import using CommonJS syntax
Create a file named products.js.
Inside products.js, create an array of objects, each representing a product with properties like name, price, and category.
Export this array using the Common JS syntax.
Create another file named shop.js.
In shop.js, require the product objects from the products.js module.
Create a function that takes a product name as a parameter and searches for the corresponding product object.
Call this function with different product names and print the details of the products.
Run shop.js and verify that the correct product details are displayed.*/

const products = require("./products.js");

function findProductByName(productName) {
  const product = products.find(p => p.name.toLowerCase() === productName.toLowerCase());
  return product;
}

// Test
const laptop = findProductByName("Laptop");
const book = findProductByName("Book");
const headphones = findProductByName("Headphones");

console.log(laptop);
console.log(book);
console.log(headphones);