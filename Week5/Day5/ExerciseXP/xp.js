/*Exercise 1 : Comparison
Create a function called compareToTen(num) that takes a number as an argument.
The function should return a Promise:
the promise resolves if the argument is less than or equal to 10
the promise rejects if argument is greater than 10.
Test:
//In the example, the promise should reject
compareToTen(15)
  .then(result => console.log(result))
  .catch(error => console.log(error))
//In the example, the promise should resolve
compareToTen(8)
  .then(result => console.log(result))
  .catch(error => console.log(error))*/

const compareToTen = (num) => {
  return new Promise((resolve, reject) => {
    if(num <= 10) {
      resolve(`The argument ${num} is less than or equal to 10`);
    } else {
      reject(`The argument ${num} is greater than 10`);
    }
  });
};

compareToTen(15)
  .then(result => console.log(result))
  .catch(error => console.log(error))

compareToTen(8)
  .then(result => console.log(result))
  .catch(error => console.log(error))

/*Exercise 2 : Promises
Create a promise that resolves itself in 4 seconds and returns a “success” string.*/

