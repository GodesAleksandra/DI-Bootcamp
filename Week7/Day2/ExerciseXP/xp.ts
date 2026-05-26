/*Exercise 1: Hello, World! Program
Create a TypeScript program that logs the message “Hello, World!” to the console.*/

console.log("Hello, World!");

/*Exercise 2: Type Annotations
Define a variable age of type number and a variable name of type string, and log them to the console.*/

let age: number = 25;
let name: string = "Alex";
console.log(`Name: ${name}, Age: ${age}`);

/*Exercise 3: Union Types
Use union types to declare a variable id that can be either a string or a number.*/

let id: string | number;

/*Exercise 4: Control Flow with if...else
Write a function that takes a number as input and returns a string indicating whether the number is positive, negative, or zero.
Use if...else statements to control the flow of a program.*/


function checkNumber(num: number): string {
  if (num > 0) {
    return "positive";
  } else if (num < 0) {
    return "negative";
  } else {
    return "zero";
  }
}

checkNumber(2);