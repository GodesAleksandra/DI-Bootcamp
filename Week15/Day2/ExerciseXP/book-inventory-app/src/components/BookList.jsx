import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  selectBooks,
  selectHorrorBooks,
  selectFantasyBooks,
  selectScienceFictionBooks,
} from '../features/bookSlice';

export default function BookList() {
  const [selectedGenre, setSelectedGenre] = useState('All');

  const books = useSelector((state) => {
    switch (selectedGenre) {
      case 'Horror':
        return selectHorrorBooks(state);
      case 'Fantasy':
        return selectFantasyBooks(state);
      case 'Science Fiction':
        return selectScienceFictionBooks(state);
      default:
        return selectBooks(state);
    }
  });

  return (
    <div className="inventory-container">
      <h2>Book Inventory Management</h2>
      
      <div className="filter-group">
        <label htmlFor="genre-select" className="filter-label">
          Filter by Genre:
        </label>
        <select
          id="genre-select"
          className="genre-select"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="All">All Genres</option>
          <option value="Horror">Horror</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Science Fiction">Science Fiction</option>
        </select>
      </div>

      <table className="book-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((book) => (
              <tr key={book.id}>
                <td><strong>{book.title}</strong></td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="no-books">
                No books available in this genre.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}