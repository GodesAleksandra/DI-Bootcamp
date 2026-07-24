/*Instructions : Create a User Management API with Registration and Login using Express.js, Bcrypt, and Database
Requirements:

Set up a new Express.js application.
Implement the following routes using express.Router:

POST /register: Allow users to register by providing a username and password. Hash the password using bcrypt before storing it in the the database
POST /login: Allow users to login by providing their username and password. Compare the hashed password from the JSON file with the provided password.
GET /users: Retrieve a list of all registered users from the database
GET /users/:id: Retrieve a specific user by ID from the database
PUT /users/:id: Update a user’s information by ID in the database

Create users table to store user data.
Define a two data tables users and hashpwd to store user details:
users table with properties like id, email, username, first_name, last_name.
hashpwd table with properties like id, username, password.
Use transaction to add a user
Create this directory structure:

server
    |_ config
    |_ controllers
    |_ models
    |_ routes


Use bcrypt to hash user passwords before storing them in the table and for verifying passwords during login.
Test your API using tools like Postman or curl.*/

const express = require('express');
const routes = require('./server/routes/routes');

const app = express();
const PORT = 3000; 

app.use(express.json());

app.use('/users', routes);

app.use((req, res, next) => {
  res.status(404).json({ message: 'User not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Старт сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});