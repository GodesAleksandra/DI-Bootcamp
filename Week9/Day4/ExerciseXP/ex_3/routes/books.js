const express = require('express')
const router = express.Router()

const books = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", publishedYear: 1925 },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", publishedYear: 1960 },
];

// Get all books
router.get('/books', (req, res) => {
    res.json(books);
});

// Add a new book
router.post('/books', (req, res) => {
    const { title, author, publishedYear } = req.body;
    const newBook = { id: books.length + 1, title, author, publishedYear };
    books.push(newBook);
    res.status(201).json(newBook);
});

// Update a book by ID
router.put('/books/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = books.findIndex((book) => book.id === id);
    if (index === -1) {
        return res.status(404).send("Book not found");
    }
    const updatedBook = {
        id: books[index].id,
        title: req.body.title,
        author: req.body.author,
        publishedYear: req.body.publishedYear,
    };
    books[index] = updatedBook;
    res.status(200).json("Book updated");
});

// Delete a book by ID
router.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex((b) => b.id === bookId);
    if (bookIndex === -1) {
        return res.status(404).json({ error: "Book not found" });
    }
    books.splice(bookIndex, 1);
    res.status(200).json({ message: "Book deleted successfully" });
});

module.exports = router;