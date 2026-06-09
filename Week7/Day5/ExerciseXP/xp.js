"use strict";
/*Exercise 1: Intersection Types
Define an intersection type PersonWithAddress that combines Person and Address types. Create a variable of this type with properties from both types.
The Person type should contain name and age, the Address type should contain street and city.*/
let person = {
    name: "Alice Ruth",
    age: 30,
    street: "56 Road St",
    city: "Lisbon"
};
function describeValue(value) {
    if (typeof value === "number") {
        return "This is a number";
    }
    else {
        return "This is a string";
    }
}
/*Exercise 3: Type Casting
Create a variable someValue of type any and cast it to a string. Then, use it as a string.*/
let someValue = "Hello, World!";
let stringValue = someValue;
console.log(stringValue.toUpperCase());
/*Exercise 4: Type Assertions with Union Types
Create a function getFirstElement that takes an array of number | string and uses type assertions to return the first element as a string.
Test with arrays of mixed types.*/
function getFirstElement(arr) {
    return arr[0];
}
console.log(getFirstElement([9, "two", "three"])); // Output: "1"
console.log(getFirstElement(["one", 2])); // Output: "one"
/*Exercise 5: Generic Constraints
Create a generic function logLength that takes a parameter of type T constrained to types with a length property (like string or Array).
The function should log the length.*/
function logLength(arg) {
    console.log(arg.length);
}
logLength("Hello, World!");
logLength([4, 9, 33, 7, 15]);
let employee = {
    name: "Alice Ruth",
    age: 30,
    position: "Manager",
    department: "Engineering"
};
function describeEmployee(employee) {
    if ("Manager" in employee) {
        return `${employee.name} aged ${employee.age} is a Manager in the ${employee.department} department.`;
    }
    else if ("Developer" in employee) {
        return `${employee.name} aged ${employee.age} is a Developer in the ${employee.department} department.`;
    }
}
console.log(describeEmployee(employee));
/*Exercise 7: Type Assertions and Generic Constraints
Create a generic function formatInput that takes a parameter of type T constrained to have a toString() method.
Use type assertions to ensure the parameter is treated as a string for formatting. The function should format the input as a string.*/
function formatInput(arg) {
    return arg.toString();
}
let formattedInput = formatInput("Hello, World!");
console.log(formattedInput); // Output: "Hello, World!"
let formattedNumber = formatInput(42);
console.log(formattedNumber); // Output: "42"
