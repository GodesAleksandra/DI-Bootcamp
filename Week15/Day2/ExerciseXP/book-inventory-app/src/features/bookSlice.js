import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  books: [
    { id: 1, title: 'The Shining', author: 'Stephen King', genre: 'Horror' },
    { id: 2, title: 'Dracula', author: 'Bram Stoker', genre: 'Horror' },
    { id: 3, title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy' },
    { id: 4, title: 'Harry Potter', author: 'J.K. Rowling', genre: 'Fantasy' },
    { id: 5, title: 'Dune', author: 'Frank Herbert', genre: 'Science Fiction' },
    { id: 6, title: 'Neuromancer', author: 'William Gibson', genre: 'Science Fiction' },
  ],
};

const bookSlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {},
});

export const bookReducer = bookSlice.reducer;

const selectInventoryState = (state) => state.inventory;

export const selectBooks = (state) => state.inventory.books;

export const selectBooksByGenre = createSelector(
  [
    selectBooks,
    (state, genre) => genre
  ],
  (books, genre) => {
    if (genre === 'All') return books;
    return books.filter((book) => book.genre === genre);
  }
);