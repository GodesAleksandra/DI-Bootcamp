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
let people_copy = people.slice(1,3);
console.log(people_copy);
console.log(people.indexOf("Foo"));
let last = people[people.length - 1];
console.log(last);
for (let i = 0; i < people.length; i++) {
    console.log(people[i])
}
for (let i = 0; i < people.length; i++) {
    console.log(people[i])
    if (people[i] == 'Devon') {
        break;
    }
}

/*Exercise 2 : Your favorite colors
Create an array called colors where the value is a list of your five favorite colors.
Loop through the array and as you loop console.log a string like so: “My #1 choice is blue”, “My #2 choice is red” ect… .
Bonus: Change it to console.log “My 1st choice”, “My 2nd choice”, “My 3rd choice”, picking the correct suffix for each number.
Hint : create an array of suffixes to do the Bonus*/

colors = ["blue", "green", "yellow", "violet", "grey"];
suffixes = ["st", "nd", "rd", "th", "th"];
for (let i = 0; i < colors.length; i++) {
    console.log("My " + (i+1) + suffixes[i] + " choice is " + colors[i]);
}

/* Exercise 3 : Repeat the question
Prompt the user for a number.
Hint : Check the data type you receive from the prompt (ie. Use the typeof method)
While the number is smaller than 10 continue asking the user for a new number.
Tip : Which while loop is more relevant for this situation?*/

let num;

while (true) {
    num = Number(prompt('Please enter a number'));

    if (typeof num === "number") {
        if (num >= 10) break;
    } else {
        alert("It's not a number!");
    }
}

/*Exercise 4 : Building Management
Copy and paste the object to your Javascript file.
Console.log the number of floors in the building.
Console.log how many apartments are on the floors 1 and 3.
Console.log the name of the second tenant and the number of rooms he has in his apartment.
Check if the sum of Sarah’s and David’s rent is bigger than Dan’s rent. If it is, than increase Dan’s rent to 1200.*/

const building = {
    numberOfFloors: 4,
    numberOfAptByFloor: {
        firstFloor: 3,
        secondFloor: 4,
        thirdFloor: 9,
        fourthFloor: 2,
    },
    nameOfTenants: ["Sarah", "Dan", "David"],
    numberOfRoomsAndRent:  {
        sarah: [3, 990],
        dan:  [4, 1000],
        david: [1, 500],
    },
}

console.log("Number of floors: " + building.numberOfFloors);
console.log("On the 1 floor " + building.numberOfAptByFloor.firstFloor + " apartments");
console.log("On the 3 floor " + building.numberOfAptByFloor.thirdFloor + " apartments");
console.log("The name of the second tenant is " + building.nameOfTenants[1] +
    " and the number of rooms he has is " + building.numberOfRoomsAndRent.dan[0]);
if ((building.numberOfRoomsAndRent.sarah[1] + building.numberOfRoomsAndRent.david[1]) > building.numberOfRoomsAndRent.dan[1]) {
     building.numberOfRoomsAndRent.dan[1] = 1200;
}
console.log(building.numberOfRoomsAndRent.dan[1]);