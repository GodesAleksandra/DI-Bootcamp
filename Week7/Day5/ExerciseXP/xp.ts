/*Exercise 1: Intersection Types
Define an intersection type PersonWithAddress that combines Person and Address types. Create a variable of this type with properties from both types.
The Person type should contain name and age, the Address type should contain street and city.*/

interface Person {
  name: string;
  age: number;
}

interface Address {
  street: string;
  city: string;
}

type PersonWithAddress = Person & Address;

let person: PersonWithAddress = {
  name: "Alice Ruth",
  age: 30,
  street: "56 Road St",
  city: "Lisbon"
};

/*Exercise 2: Type Guards with Union Types
Create a function describeValue that accepts number | string. Use type guards to return a description based on the input type:
"This is a number" for numbers.
"This is a string" for strings.*/

type alphanumeric = string | number;

function describeValue(value: alphanumeric): string {
  if (typeof value === "number") {
    return "This is a number";
  } else {
    return "This is a string";
  }
}

/*Exercise 3: Type Casting
Create a variable someValue of type any and cast it to a string. Then, use it as a string.*/

let someValue: any = "Hello, World!";
let stringValue: string = someValue as string;
console.log(stringValue.toUpperCase());

/*Exercise 4: Type Assertions with Union Types
Create a function getFirstElement that takes an array of number | string and uses type assertions to return the first element as a string. 
Test with arrays of mixed types.*/

function getFirstElement(arr: (number | string)[]): string {
  return arr[0] as string;
}

console.log(getFirstElement([9, "two", "three"])); // Output: "1"
console.log(getFirstElement(["one", 2])); // Output: "one"

/*Exercise 5: Generic Constraints
Create a generic function logLength that takes a parameter of type T constrained to types with a length property (like string or Array). 
The function should log the length.*/

function logLength<T extends { length: number }>(arg: T): void {
  console.log(arg.length);
}

logLength("Hello, World!");
logLength([4, 9, 33, 7, 15]);

/*Exercise 6: Intersection Types and Type Guards
Define a type Employee that combines Person and Job using intersection types. Create a function describeEmployee 
that takes an Employee object and uses type guards to return a description based on whether the Job is a Manager or a Developer.

Person type: name: string; age: number;
Job type: position: string; department: string;
Employee type should combine these.
describeEmployee should return a specific message for each type of job.*/

interface Person {
  name: string;
  age: number;
}

interface Job {
  position: string;
  department: string;
}

type Employee = Person & Job;

let employee: Employee = {
  name: "Alice Ruth",
  age: 30,
  position: "Manager",
  department: "Engineering"
};

function describeEmployee(employee: Employee): string | undefined {
  if ("Manager" in employee) {
    return `${employee.name} aged ${employee.age} is a Manager in the ${employee.department} department.`;
  } else if ("Developer" in employee) {
    return `${employee.name} aged ${employee.age} is a Developer in the ${employee.department} department.`;
  }
}

console.log(describeEmployee(employee));

/*Exercise 7: Type Assertions and Generic Constraints
Create a generic function formatInput that takes a parameter of type T constrained to have a toString() method. 
Use type assertions to ensure the parameter is treated as a string for formatting. The function should format the input as a string.*/

function formatInput<T extends { toString(): string }>(arg: T): string {
    return arg.toString();
}

let formattedInput = formatInput("Hello, World!") as string;
console.log(formattedInput); // Output: "Hello, World!"

let formattedNumber = formatInput(42) as string;
console.log(formattedNumber); // Output: "42"