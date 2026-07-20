const db = require('../config/db');

const findAll = () => {
  return db('books').select('*').orderBy('id', 'asc');
};

const findById = (id) => {
  return db('books').where({ id }).first();
};

const create = async (bookData) => {
  const [newBook] = await db('books')
    .insert(bookData)
    .returning('*'); 
  return newBook;
};

module.exports = {
  findAll,
  findById,
  create
};
