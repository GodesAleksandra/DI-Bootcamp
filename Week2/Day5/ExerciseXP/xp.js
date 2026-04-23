//Exercise 1 : List of people
//const people = ["Greg", "Mary", "Devon", "James"];
//Write code to remove “Greg” from the people array.
//Write code to replace “James” to “Jason”.
//Write code to add your name to the end of the people array.
//Write code that console.logs Mary’s index. take a look at the indexOf method on Google.
//Write code to make a copy of the people array using the slice method.
//The copy should NOT include “Mary” or your name.
//Hint: remember that now the people array should look like this const people = ["Mary", "Devon", "Jason", "Yourname"];
//Hint: Check out the documentation for the slice method
//Write code that gives the index of “Foo”. Why does it return -1 ?
//Create a variable called last which value is the last element of the array.
//Hint: What is the relationship between the index of the last element in the array and the length of the array?
//Using a loop, iterate through the people array and console.log each person.
//Using a loop, iterate through the people array and exit the loop after you console.log “Devon” .
//Hint: take a look at the break statement in the lesson.


const people = ["Greg", "Mary", "Devon", "James"];
people.splice(0, 1);
people[2] = "Jason";
people.push("Aleksandra");
console.log(people.indexOf("Mary"));
let people_copy = people.slice(1,2);

console.log(people_copy);
console.log(people);