/*Exercise 1: Building a RESTful API
You’re tasked with building a RESTful API for a blog platform.
Users should be able to create, read, update, and delete blog posts using different endpoints.
Create a directory named blog-api.
Inside the blog-api directory, open a terminal and run npm init to initialize a new Node.js project. 
Follow the prompts to set up your project.
Install the express package by running npm install express in the terminal.
Create a file named server.js.
In server.js, require the express package and set up an Express app.
Create a data array to simulate a database. Each item in the array should represent a blog post with properties like id, title, and content.
Implement the following routes using Express:
GET /posts: Return a list of all blog posts.
GET /posts/:id: Return a specific blog post based on its id.
POST /posts: Create a new blog post.
PUT /posts/:id: Update an existing blog post.
DELETE /posts/:id: Delete a blog post.
Implement error handling for invalid routes and server errors.
Start the Express app and listen on a specified port (e.g., 3000).*/

const express = require("express");
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello!');
});

const posts = [
  { id: 1, title: "First Post", content: "This is the content of the first post." },
  { id: 2, title: "Second Post", content: "This is the content of the second post." },
];

//Return a list of all blog posts
app.get("/api/posts", (req, res) => {
  res.json(posts);
});

//Return a specific blog post based on its id
app.get("/api/posts/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find((p) => p.id === postId);
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }
  res.json(post);
});

//Create a new blog post
app.post("/api/posts", (req, res) => {
  const { title, content } = req.body;
  const newPost = { id: posts.length + 1, title, content };
  posts.push(newPost);
  res.status(201).json(newPost);
});

//Update an existing blog post
app.put("/api/posts/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = posts.findIndex((post) => post.id === id);
  if (index === -1) {
    return res.status(404).send("Post not found");
  }
  const updatedPost = {
    id: posts[index].id,
    title: req.body.title,
    content: req.body.content,
  };
  posts[index] = updatedPost;
  res.status(200).json("Post updated");
});

//Delete a blog post
app.delete("/api/posts/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const postIndex = posts.findIndex((p) => p.id === postId);
  if (postIndex === -1) {
    return res.status(404).json({ error: "Post not found" });
  }
  posts.splice(postIndex, 1);
  res.status(200).json({ message: "Post deleted successfully" });
});

//Error handling for invalid routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});