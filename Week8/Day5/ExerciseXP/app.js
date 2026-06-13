/*Exercise 2: Advanced Module Usage using ES6 module syntax
Create a file named data.js.
Inside data.js, define an array of objects, each representing a person with properties like name, age, and location.
Export the array using the ES6 module syntax.
Create another file named app.js.
In app.js, import the array of person objects from the data.js module.
Write a function that calculates and prints the average age of all the persons in the array.
Use the imported array and the average age function in app.js.
Run app.js and confirm that the average age is correctly calculated and displayed.*/

import { people } from './data.js';

function calculateAverageAge(persons) {
  const totalAge = persons.reduce((sum, person) => sum + person.age, 0);
  const averageAge = totalAge / persons.length;
  console.log(`Average Age: ${averageAge}`);
}

calculateAverageAge(people);