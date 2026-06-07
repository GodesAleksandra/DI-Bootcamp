"use strict";
/*Exercise 1: Class with Access Modifiers
Create a class Employee with the following properties:
A private property name of type string.
A private property salary of type number.
A public property position of type string.
A protected property department of type string.
Also, include a constructor to initialize these properties.
Create a public method getEmployeeInfo that returns the employee’s name and position.*/
class Employee {
    name;
    salary;
    position;
    department;
    constructor(name, salary, position, department) {
        this.name = name;
        this.salary = salary;
        this.position = position;
        this.department = department;
        this.name = name;
        this.salary = salary;
        this.position = position;
        this.department = department;
    }
    getEmployeeInfo() {
        return `Name: ${this.name}, Position: ${this.position}`;
    }
}
/*Exercise 2: Readonly Properties in a Class
Create a class Product with the following properties:
A readonly property id of type number.
A public property name of type string.
A public property price of type number.
Create a method getProductInfo that returns a string with the product’s name and price.
Attempt to modify the id property after creating a new instance of the class and observe the result.*/
class Product {
    id;
    name;
    price;
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
    getProductInfo() {
        return `Name: ${this.name}, Price: ${this.price}`;
    }
}
const product = new Product(1, "Laptop", 999.99);
// product.id = 2; // Error: Cannot assign to 'id' because it is a read-only property.  
/*Exercise 3: Class Inheritance
Create a base class Animal with a public property name and a method makeSound that returns a string.
Create a subclass Dog that extends Animal and overrides the makeSound method to return the sound a dog makes (“bark”).
Create an instance of the Dog class and call the makeSound method.*/
class Animal {
    name;
    constructor(name) {
        this.name = name;
        this.name = name;
    }
    makeSound() {
        return "Some animal sound";
    }
}
class Dog extends Animal {
    constructor(name) {
        super(name);
    }
    makeSound() {
        return "bark";
    }
}
const dog = new Dog("Max");
console.log(dog.makeSound()); // Output: bark
/*Exercise 4: Static Properties and Methods
Create a class Calculator with the following static methods:
add(a: number, b: number): number – returns the sum of two numbers.
subtract(a: number, b: number): number – returns the difference between two numbers.
Call these methods without creating an instance of the class.*/
class Calculator {
    static add(a, b) {
        return a + b;
    }
    static subtract(a, b) {
        return a - b;
    }
}
// Call the static methods without creating an instance of the class
console.log(Calculator.add(10, 2)); // Output: 12
console.log(Calculator.subtract(12, 3)); // Output: 9
function printUserDetails(user) {
    console.log(`ID: ${user.id}, Name: ${user.name}, Email: ${user.email}, Membership Level: ${user.membershipLevel}`);
}
