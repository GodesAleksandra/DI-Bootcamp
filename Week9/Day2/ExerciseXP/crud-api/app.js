/*Exercise 3: Building a Basic CRUD API with Express and Axios using a Data Module
In this exercise, you’ll build a basic CRUD (Create, Read, Update, Delete) API using Express.js 
and Axios to retrieve data from the JSONPlaceholder API and respond with that data in your own API. 
You’ll also create a separate module to handle data retrieval using Axios.
Part 1: Setting Up the Express Server
Create a new directory named crud-api.
Inside the crud-api directory, initialize a new Node.js project and install the express and axios packages.
Create a new file named app.js in the crud-api directory.
In app.js, import the express module and create an instance of an Express app.
Set up the app to listen on port 5000. Print a message in the console to indicate that the server is running.

Part 2: Creating a Data Module for Axios
Inside the crud-api directory, create a new directory named data.
Inside the data directory, create a new file named dataService.js.
In dataService.js, import the axios module and create a function named fetchPosts that makes a GET request to the JSONPlaceholder 
API to fetch data for all posts.
Export the fetchPosts function.

Part 3: Using the Data Module in the Express App
Inside app.js, import the dataService module you created.
Create an endpoint in your Express app that uses the fetchPosts function from the dataService module to retrieve data from the 
JSONPlaceholder API.
Respond with the fetched data from the JSONPlaceholder API. https://jsonplaceholder.typicode.com/posts
Print a message in the console to indicate that the data has been successfully retrieved and sent as a response.*/

const express = require("express");
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello!');
});

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});

const fetchPosts = require("./data/dataService").fetchPosts;

app.get("/api/posts", async (req, res) => {
  try {
    const posts = await fetchPosts();
    res.json(posts);
    console.log("Data successfully retrieved and sent as a response.");
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});