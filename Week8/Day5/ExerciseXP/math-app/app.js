/* Exercise 5: Creating and Using a Custom Module
Create a directory named math-app.
Inside the math-app directory, open a terminal and run npm init to initialize a new Node.js project. 
Follow the prompts to set up your project.
Install the lodash package, a utility library, by running npm install lodash in the terminal.
Create a file named math.js inside the math-app directory.
In math.js, define a simple custom module that exports functions for addition and multiplication.
Create a file named app.js in the same directory.
In app.js, require the lodash package and the custom math module.
Use the exported functions from the math module and the utility functions from the lodash package to perform calculations.
Run app.js using Node.js and verify that the calculations are correct.*/

const lodash = require("lodash");

const { add, multiply } = require('./math.js');

const sum = add(5, 10);
const product = multiply(5, 10);

console.log('Sum:', sum);
console.log('Product:', product);