/*Challenge Task: Integrating Everything
Create a file named challenge.js.
In challenge.js, require the modules from the previous tasks: greeting.js, colorful-message.js, and read-file.js.
Use the greet function to greet the user, display the colorful message, and read and display the file’s content.
Run challenge.js using Node.js and see the complete challenge in action.*/

const greet = require('./greeting');
const colorfulMessage = require('./colorful-message');
const readFileInfo = require('./read-file');

greet('Alice');
colorfulMessage('This is a colorful message!');
readFileInfo();