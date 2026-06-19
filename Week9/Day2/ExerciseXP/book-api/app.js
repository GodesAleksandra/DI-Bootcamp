/*Exercise 2: Building a Basic CRUD API with Express.js
In this exercise, you’ll build a basic CRUD (Create, Read, Update, Delete) API using Express.js. 
Your task is to create routes to manage a collection of books.
Create a new directory named book-api.
Inside the book-api directory, initialize a new Node.js project and install the express package.
Create a new file named app.js in the book-api directory.
In app.js, import the express module and create an instance of an Express app.
Define a basic data array containing a few book objects. Each book object should have properties like id, title, author, and publishedYear.
Set up the app to listen on port 5000. Print a message in the console to indicate that the server is running.
Implement the “Read all” route by defining a route at GET /api/books. Send a JSON response with the books array.
Implement the “Read” route by defining a route at GET /api/books/:bookId. 
Extract the bookId parameter from the URL and use it to find the corresponding book in the books array. 
If the book is found, send a JSON response with the book details and a status code of 200 (OK). 
If the book is not found, send a 404 status with a “Book not found” message.
Implement the “Create” route at POST /api/books. Use the express.json() middleware to parse JSON body content. 
Inside the route handler, create a new book object with an incremented ID and the data from the request body. 
Add the new book to the books array and return a JSON response with the new book and a status code of 201 (Created).*/

const express = require("express");
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello!');
});

const books = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", publishedYear: 1925 },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", publishedYear: 1960 },
];

//Return a list of all books
app.get("/api/books", (req, res) => {
  res.json(books);
});

//Return a specific book based on its id
app.get("/api/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find((b) => b.id === bookId);
  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  } 
  res.status(200).json(book);
});

//Create a new book
app.post("/api/books", (req, res) => {
  const { title, author, publishedYear } = req.body;
  const newBook = { id: books.length + 1, title, author, publishedYear };
  books.push(newBook);
  res.status(201).json(newBook);
});

//Error handling for invalid routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
