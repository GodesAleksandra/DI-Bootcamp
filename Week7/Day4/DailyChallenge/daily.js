"use strict";
/*Daily Challenge: Building a Library System with TypeScript Classes and Interfaces
Create a simple library system with TypeScript:
Interface Book: Define an interface Book with the following properties:
title (string)
author (string)
isbn (string)
publishedYear (number)
An optional genre property (string)
Class Library: Create a class Library with:
A private property books (array of Book).
A public method addBook to add a new book to the library.
A public method getBookDetails that returns details of a book based on the isbn.
Class DigitalLibrary: Create a class DigitalLibrary that extends Library and adds:
A readonly property website (string) for the library’s website.
A public method listBooks that returns a list of all book titles in the library.
Create an instance of DigitalLibrary, add some books to it, and then print out the details of the books and the list of all book titles.*/
class Library {
    books = [];
    addBook(book) {
        this.books.push(book);
    }
    getBookDetails(isbn) {
        return this.books.find(book => book.isbn === isbn);
    }
}
class DigitalLibrary extends Library {
    website;
    constructor(website) {
        super();
        this.website = website;
    }
    listBooks() {
        return this.books.map(book => book.title);
    }
}
// Create an instance of DigitalLibrary
const myLibrary = new DigitalLibrary("www.digitallibrary.com");
// Add some books to the library
myLibrary.addBook({ title: "The Alchemist", author: "Paulo Coelho", isbn: "978-0061122415", publishedYear: 1988 });
myLibrary.addBook({ title: "To Kill a Mockingbird", author: "Harper Lee", isbn: "978-0060935464", publishedYear: 1960, genre: "Fiction" });
myLibrary.addBook({ title: "1984", author: "George Orwell", isbn: "978-0451524935", publishedYear: 1949, genre: "Dystopian" });
console.log(myLibrary.getBookDetails("978-0061122415"));
console.log(myLibrary.listBooks());
