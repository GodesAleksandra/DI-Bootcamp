const { findAll, findById, create } = require('../models/bookModel');

const getAllBooks = async (req, res) => {
  try {
    const books = await findAll();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving books', error: error.message });
  }
};

const getBookById = async (req, res) => {
  try {
    const bookId = parseInt(req.params.bookId, 10);
    const book = await findById(bookId);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving book', error: error.message });
  }
};

const createBook = async (req, res) => {
  try {
    const { title, author, publishedYear } = req.body;

    if (!title || !author || !publishedYear) {
      return res.status(400).json({ message: 'Missing required book fields' });
    }

    const newBook = await create({
      title,
      author,
      "publishedYear": parseInt(publishedYear, 10) // Кавычки нужны, если в Postgres поле camelCase
    });

    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: 'Error creating book', error: error.message });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook
};
