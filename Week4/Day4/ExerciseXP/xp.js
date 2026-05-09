/*Exercise 1 : Colors
Write a JavaScript program that displays the colors in the following order : “1# choice is Blue.” “2# choice is Green.” “3# choice is Red.” ect…
Check if at least one element of the array is equal to the value “Violet”. If yes, console.log("Yeah"), else console.log("No...")
Hint : Use the array methods taught in class. Look at the lesson Array Methods.*/

const colors = ["Blue", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow"];
colors.forEach((color, index) => {
    console.log(`${index+1}# choice is ${color}.`);
});
if (colors.some(value => value == "Violet" )) console.log("Yeah");
else console.log("No...");


/*Exercise 2 : Colors #2
Write a JavaScript program that displays the colors in the following order : “1st choice is Blue .” “2nd choice is Green.” “3rd choice is Red.” ect…
Hint : Use the array methods taught in class and ternary operator.*/

const colors = ["Blue", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow"];
const ordinal = ["th","st","nd","rd"];
colors.forEach((color, index) => {
    console.log(`${index+1}${index > 2 ? 'th' : ordinal[index+1]} choice is ${color}.`);
});

/*Exercise 3 : Analyzing
Analyze these pieces of code before executing them. What will be the outputs ?*/
//------1------
const fruits = ["apple", "orange"];
const vegetables = ["carrot", "potato"];

const result = ['bread', ...vegetables, 'chicken', ...fruits];
console.log(result);// Output: ['bread', 'carrot', 'potato', 'chicken', 'apple', 'orange']

//------2------
const country = "USA";
console.log([...country]);// Output: ['U', 'S', 'A']

//------Bonus------
let newArray = [...[,,]];
console.log(newArray);// Output: [undefined, undefined]

