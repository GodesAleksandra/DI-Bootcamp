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
// #4.2 What will happen if the variable is declared
// with const instead of let ?

//#5
let a = 2;
if (true) {
    let a = 5;
    alert(`in the if block ${a}`);
}
alert(`outside of the if block ${a}`);

// #5.1 - run the code in the console
// #5.2 What will happen if the variable is declared
// with const instead of let ?