/*Exercise 1 : Building a RESTful API with database connection
Instructions
You’re tasked with building a RESTful API for a blog platform.
Users should be able to create, read, update, and delete blog posts using different endpoints.
Create a directory named blog-api.
Inside the blog-api directory, open a terminal and run npm init to initialize a new Node.js project. Follow the prompts to set up your project.
Install the express package by running npm install express in the terminal.
Create a file named server.js.
In server.js, require the express package and set up an Express app.
Create a posts table in postgres database, with the properties like id, title, and content.
Implement the following routes using Express:
GET /posts: Return a list of all blog posts.
GET /posts/:id: Return a specific blog post based on its id.
POST /posts: Create a new blog post.
PUT /posts/:id: Update an existing blog post.
DELETE /posts/:id: Delete a blog post.
Create this directory structure:

server
    |_ config
    |_ controllers
    |_ models
    |_ routes

Implement error handling for invalid routes and server errors.
Start the Express app and listen on a specified port (e.g., 3000).*/

const express = require('express');
const postRoutes = require('./server/routes/postRoutes');

const app = express();
const PORT = 3000; // Порт задан напрямую

// Парсер JSON для обработки тела запросов
app.use(express.json());

// Маршруты API
app.use('/posts', postRoutes);

// Обработка несуществующих маршрутов (404 Not Found)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Централизованная обработка ошибок сервера (500)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Старт сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});