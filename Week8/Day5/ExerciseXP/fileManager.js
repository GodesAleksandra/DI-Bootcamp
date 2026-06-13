/*Exercise 3: File Management using CommonJS syntax
Create a file named fileManager.js.
Inside fileManager.js, define a module that exports functions for reading and writing files.
Export functions named readFile and writeFile.
Implement the readFile function to read the content of a specified file using the fs module.
Implement the writeFile function to write content to a specified file using the fs module.
Create a file “Hello World.txt” containing the sentence “Hello World !! “
Create a file “Bye World.txt” containing the sentence “Bye World !! “
Create another file named app2.js.
In app2.js, import the functions from the fileManager.js module.
Use the imported functions to read the content of the “Hello World.txt” text file and 
then write to the “Bye World.txt” with the content “Writing to the file”.
Run app2.js and verify that the file reading and writing operations are successful.*/

const fs = require('fs');

function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function writeFile(filePath, content) {
  fs.writeFileSync(filePath, content);
}

module.exports = {
  readFile,
  writeFile
};