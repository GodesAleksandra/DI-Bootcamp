/*Exercise 1 : Scope
Analyse the code below, and predict what will be the value of a in all the following functions.
Write your prediction as comments in a js file. Explain your predictions.*/
// #1
function funcOne() {
    let a = 5;
    if(a > 1) {
        a = 3;
    }
    alert(`inside the funcOne function ${a}`);
}

// #1.1 - run in the console:
funcOne()
// Output: inside the funcOne function 3
// #1.2 What will happen if the variable is declared
// with const instead of let ?
//TypeError: Assignment to constant variable.

//#2
let a = 0;
function funcTwo() {
    a = 5;
}

function funcThree() {
    alert(`inside the funcThree function ${a}`);
}

// #2.1 - run in the console:
funcThree()
// Output: inside the funcThree function 0
funcTwo()
funcThree()
// Output: inside the funcThree function 5
// #2.2 What will happen if the variable is declared
// with const instead of let ?
funcThree()
// Output: inside the funcThree function 0
funcTwo()
// TypeError: Assignment to constant variable.
funcThree()
// Output: inside the funcThree function 0


//#3
function funcFour() {
    window.a = "hello";
}


function funcFive() {
    alert(`inside the funcFive function ${a}`);
}

// #3.1 - run in the console:
funcFour()
funcFive()
// Output: inside the funcFive function hello

//#4
let a = 1;
function funcSix() {
    let a = "test";
    alert(`inside the funcSix function ${a}`);
}


// #4.1 - run in the console:
funcSix()
//Output: inside the funcSix function test
// #4.2 What will happen if the variable is declared
// with const instead of let ?
//Output: inside the funcSix function test

//#5
let a = 2;
if (true) {
    let a = 5;
    alert(`in the if block ${a}`);
}
alert(`outside of the if block ${a}`);

// #5.1 - run the code in the console
// in the if block 5
// outside of the if block 2
// #5.2 What will happen if the variable is declared
// with const instead of let ?
// in the if block 5
// outside of the if block 2

/*Exercise 2 : Ternary operator
function winBattle(){
    return true;
}
Transform the winBattle() function to an arrow function.
Create a variable called experiencePoints.
Assign to this variable, a ternary operator. If winBattle() is true, the experiencePoints variable should be equal to 10, else the variable should be equal to 1.
Console.log the experiencePoints variable.*/

const winBattle = () => {
    return true;
}

const experiencePoints = winBattle() == true ? 10 : 1;
console.log(experiencePoints);

/* Exercise 3 : Is it a string ?
Write a JavaScript arrow function that checks whether the value of the argument passed, is a string or not. The function should return true or false
Check out the example below to see the expected output
Example:
console.log(isString('hello'));
//true
console.log(isString([1, 2, 4, 0]));
//false
*/

const isString = (arg) => {
    if (typeof arg === 'string') return true;
    else return false;
}

console.log(isString('hello'));
console.log(isString([1, 2, 4, 0]));

/* Exercise 4 : Find the sum
Create a one line function (ie. an arrow function) that receives two numbers as parameters and returns the sum.
*/

const sum = (x, y) => x + y;
console.log(sum(20,30));

/*Exercise 5 : Kg and grams
Create a function that receives a weight in kilograms and returns it in grams. (Hint: 1 kg is 1000gr)
First, use function declaration and invoke it.
Then, use function expression and invoke it.
Write in a one line comment, the difference between function declaration and function expression.
Finally, use a one line arrow function and invoke it.*/

function convertKgToGr(kg) {
    return kg * 1000;
}

convertKgToGr(20);

let convertToGr = function (kg) {
    return kg * 1000;
}
convertToGr(20);

// Function Declaration is hoisted and must have a name. Function Expression is not hoisted and anonymous.

const convert = (x) => x * 1000;
convert(5);

