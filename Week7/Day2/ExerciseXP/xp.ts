/*Exercise 1: Hello, World! Program
Create a TypeScript program that logs the message “Hello, World!” to the console.*/

let greeting: string = "Hello, World!";
console.log(greeting);

/*Exercise 2: Type Annotations
Define a variable age of type number and a variable name of type string, and log them to the console.*/

let age: number = 25;
let name2: string = "Alex";
console.log(`Name: ${name2}, Age: ${age}`);

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

/*Exercise 5: Tuple Types
Create a function getDetails that takes a name and age as input and returns a tuple containing the input values and a greeting message.
The tuple should contain multiple values of different types

// Call the function and log the tuple
const details = getDetails("Alice", 25);
// Expected output
console.log(details); // Output: ['Alice', 25, 'Hello, Alice! You are 25 years old.']*/

function getDetails(name: string, age: number): [string, number, string] {
  const greetingMessage: string = `Hello, ${name}! You are ${age} years old.`;
  return [name, age, greetingMessage];
}

const details = getDetails("Alice", 25);
console.log(details);

/* Exercise 6: Object Type Annotations
Define the Object Structure:
Create an object type annotation that defines the shape of a Person object. The object should have two properties:
name (a string) and age (a number).
Create the Function:
Write a function named createPerson that takes two parameters: name (string) and age (number).
The function should return an object that matches the Person structure.
Test the Function:
Test the createPerson function by creating a person and logging the result to the console.*/

interface Person {
  name: string;
  age: number;
}

function createPerson(name: string, age: number): Person {
  return {
    name: name,
    age: age
  };
}

const person = createPerson("Bob", 30);
console.log(person);

/*Exercise 7: Type Assertions
Get an Element from the DOM:
Use document.getElementById() to retrieve an HTML element from the DOM.
Use Type Assertion:
Apply a type assertion to cast the element to a specific HTML element type, such as HTMLInputElement.
Access the Element’s Properties:
Once cast, use the properties of the specific element type, like setting the value of an input element.
Test the Functionality:
Ensure that you can successfully set or manipulate a property of the element.
Additional Notes:
Type assertions are a powerful way to let TypeScript know more about the type of an element when you’re certain of it. 
However, you should use them cautiously, as incorrect assertions can lead to runtime errors if the type is not 
as expected.*/

const myInput = document.getElementById("input") as HTMLInputElement;
myInput.value = "Hello!";

/* Exercise 8: switch Statement with Complex Conditions
Create a function getAction that takes a string representing a user role and returns an action for the user. 
Use a switch statement with complex conditions to handle multiple roles.

// Test the function with different roles
console.log(getAction("admin")); // Output: Manage users and settings
console.log(getAction("editor")); // Output: Edit content
console.log(getAction("viewer")); // Output: View content
console.log(getAction("guest")); // Output: Limited access
console.log(getAction("unknown")); // Output: Invalid role*/

function getAction(role: string): string {
  switch (role) {
    case "admin":
      return "Manage users and settings";
    case "editor":
      return "Edit content";
    case "viewer":
      return "View content";
    case "guest":
      return "Limited access";
    default:
      return "Invalid role";
  }
}

console.log(getAction("admin")); 
console.log(getAction("editor")); 
console.log(getAction("viewer")); 
console.log(getAction("guest")); 
console.log(getAction("unknown"));

/* Exercise 9: Function Overloading with Default Parameters
Create an overloaded function greet that can either take a name and greet the person, or take no arguments 
and return a default greeting.*/

function greet(name: string): string;
function greet(): string;
function greet(name?: string): string {
  if (typeof name !== "undefined") {
    return `Hello, ${name}!`;
  }
  return "Hello, World!";
}