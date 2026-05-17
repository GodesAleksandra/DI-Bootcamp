/*1st daily challenge
Create two functions. Each function should return a promise.
The first function called makeAllCaps(), takes an array of words as an argument
If all the words in the array are strings, resolve the promise. The value of the resolved promise is the array of words uppercased.
else, reject the promise with a reason.
The second function called sortWords(), takes an array of words uppercased as an argument
If the array length is bigger than 4, resolve the promise. The value of the resolved promise is the array of words sorted in alphabetical order.
else, reject the promise with a reason.*/

const makeAllCaps = (words) => {
  return new Promise((resolve, reject) => {
    if(words.every(word => typeof word === 'string')) {
      resolve(words.map(word => word.toUpperCase()));
    } else {
      reject(`Not all the words in the array [${words}] are strings`);
    }
  });
};

const sortWords = (words) => {
  return new Promise((resolve, reject) => {
    if(words.length > 4) {
      resolve(words.sort());
    } else {
      reject(`The array [${words}] length is bigger than 4`);
    }
  });
};

//in this example, the catch method is executed
makeAllCaps([1, "pear", "banana"])
      .then((arr) => sortWords(arr))
      .then((result) => console.log(result))
      .catch(error => console.log(error));

//in this example, the catch method is executed
makeAllCaps(["apple", "pear", "banana"])
      .then((arr) => sortWords(arr))
      .then((result) => console.log(result))
      .catch(error => console.log(error))

//in this example, you should see in the console,
// the array of words uppercased and sorted
makeAllCaps(["apple", "pear", "banana", "melon", "kiwi"])
      .then((arr) => sortWords(arr))
      .then((result) => console.log(result)) //["APPLE","BANANA", "KIWI", "MELON", "PEAR"]
      .catch(error => console.log(error))

/*2nd daily challenge
Create three functions. The two first functions should return a promise..

The first function is named toJs():
this function converts the morse json string provided above to a morse javascript object.
if the morse javascript object is empty, throw an error (use reject)
else return the morse javascript object (use resolve)

The second function called toMorse(morseJS), takes one argument: the new morse javascript object.
This function asks the user for a word or a sentence.
if the user entered a character that doesn’t exist in the new morse javascript object, throw an error. (use reject)
else return an array with the morse translation of the user’s word.
if the user enters the word "Hello", the promise resolves with this value ["....", ".", ".-..", ".-..","---"]
if the user entered the word "¡Hola!", the promise rejects because the character "¡" doesn't exist in the morse javascript object


The third function called joinWords(morseTranslation), takes one argument: the morse translation array
this function joins the morse translation by using line break and display it on the page (ie. On the DOM)

Chain the three functions.
Example:
"Hello" gives you
....
.
.-..
.-..
---*/

const morse = `{
  "0": "-----",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
  "a": ".-",
  "b": "-...",
  "c": "-.-.",
  "d": "-..",
  "e": ".",
  "f": "..-.",
  "g": "--.",
  "h": "....",
  "i": "..",
  "j": ".---",
  "k": "-.-",
  "l": ".-..",
  "m": "--",
  "n": "-.",
  "o": "---",
  "p": ".--.",
  "q": "--.-",
  "r": ".-.",
  "s": "...",
  "t": "-",
  "u": "..-",
  "v": "...-",
  "w": ".--",
  "x": "-..-",
  "y": "-.--",
  "z": "--..",
  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "!": "-.-.--",
  "-": "-....-",
  "/": "-..-.",
  "@": ".--.-.",
  "(": "-.--.",
  ")": "-.--.-"
}`;
let morseJS = {};

const toJs = (morse) => {
  return new Promise((resolve, reject) => {
    morseJS = JSON.parse(morse);
    if(morseJS) { //if(Object.keys(morseJS).length === 0)
      resolve(morseJS);
    } else {
      reject(`morseJS is empty`);
    }
  });
};

const toMorse = (morseJS) => {
  return new Promise((resolve, reject) => {
    const word = prompt("What is a word or a sentence?").toLowerCase();
    const letters = [...word];
    let morseTranslation = [];
    letters.forEach((element, index, array) => {
      morseTranslation.push(morseJS[element]);
    });
    if(!morseTranslation.includes(undefined)) {
      resolve(morseTranslation);
    } else {
      reject(`You entered a character that doesn’t exist in the morse object`);
    }
  });
};

function joinWords(morseTranslation) {
    const result = morseTranslation.join('\n');
    console.log(result);
    p = document.createElement("p");
    p.innerText = result;
    document.body.appendChild(p);
}

toJs(morse)
  .then((morseJS) => toMorse(morseJS))
  .then((morseTranslation) => joinWords(morseTranslation))
  //.then((result) => console.log(result))
  .catch(error => console.log(error));