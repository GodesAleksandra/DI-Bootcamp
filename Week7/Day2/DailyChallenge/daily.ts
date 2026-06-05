/*Daily Challenge: Union Type Validator
Create a function called validateUnionType that accepts a value and an array of allowed types (as strings). 
The function should check if the value is of one of the allowed types and return true if it is; 
otherwise, it should return false. Use this function to validate the type of variables in a program.
Exercise
Create a function called validateUnionType(value: any, allowedTypes: string[]): boolean that takes a value and an array 
of allowed types (as strings). The function should return true if the value is one of the allowed types; 
otherwise, it should return false. Demonstrate its usage by validating variables with different types.*/

function validateUnionType(value: any, allowedTypes: string[]): boolean {
    for (const allowedType of allowedTypes) {
        if (typeof value === allowedType) {
            return true;
        }
    }
    return false;
}

// Example usage:
const value1 = "Hello, Alex!";
const value2 = 12;
const value3 = true;

console.log(validateUnionType(value1, ["number","string","boolean"])); // true
console.log(validateUnionType(value2, ["boolean"])); // false
console.log(validateUnionType(value3, ["boolean"])); // true