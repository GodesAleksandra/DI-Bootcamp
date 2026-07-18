/*Part I

Create 2 tables : Customer and Customer profile. They have a One to One relationship.

A customer can have only one profile, and a profile belongs to only one customer
The Customer table should have the columns : id, first_name, last_name NOT NULL
The Customer profile table should have the columns : id, isLoggedIn DEFAULT false (a Boolean), customer_id (a reference to the Customer table)

Insert those customers

John, Doe
Jerome, Lalu
Lea, Rive

Insert those customer profiles, use subqueries

John is loggedIn
Jerome is not logged in

Use the relevant types of Joins to display:
The first_name of the LoggedIn customers
All the customers first_name and isLoggedIn columns - even the customers those who don’t have a profile.
The number of customers that are not LoggedIn*/

CREATE TABLE customer (
     id SERIAL PRIMARY KEY, 
     first_name VARCHAR(50) NOT NULL, 
     last_name VARCHAR(50) NOT NULL
);

CREATE TABLE customer_profile (
    id SERIAL PRIMARY KEY,
    is_logged_in BOOLEAN DEFAULT false NOT NULL,
    customer_id INTEGER NOT NULL,
    CONSTRAINT uq_customer_profile_customer UNIQUE (customer_id),
    CONSTRAINT fk_customer_profile_customer FOREIGN KEY (customer_id) 
        REFERENCES customer(id) 
        ON DELETE CASCADE
);

INSERT INTO customer (first_name, last_name)
VALUES
('John', 'Doe'),
('Jerome', 'Lalu'),
('Lea', 'Rive');

INSERT INTO customer_profile (is_logged_in, customer_id)
VALUES (
    true, 
    (SELECT id FROM customer WHERE first_name = 'John' LIMIT 1)
);

INSERT INTO customer_profile (is_logged_in, customer_id)
VALUES (
    false, 
    (SELECT id FROM customer WHERE first_name = 'Jerome' LIMIT 1)
);

SELECT c.first_name
  FROM customer c
 WHERE c.id IN (SELECT customer_id FROM customer_profile cp WHERE is_logged_in = true);

 SELECT c.first_name, cp.is_logged_in
  FROM customer c
  LEFT JOIN customer_profile cp ON cp.customer_id = c.id;

 SELECT COUNT(c.id) NotLoggedIn
  FROM customer c
 WHERE c.id IN (SELECT customer_id FROM customer_profile cp WHERE is_logged_in = false);

/*Part II:
Create a table named Book, with the columns : book_id SERIAL PRIMARY KEY, title NOT NULL, author NOT NULL

Insert those books :
Alice In Wonderland, Lewis Carroll
Harry Potter, J.K Rowling
To kill a mockingbird, Harper Lee

Create a table named Student, with the columns : student_id SERIAL PRIMARY KEY, name NOT NULL UNIQUE, age. Make sure that the age is never bigger than 15 (Find an SQL method);

Insert those students:
John, 12
Lera, 11
Patrick, 10
Bob, 14

Create a table named Library, with the columns :
book_fk_id ON DELETE CASCADE ON UPDATE CASCADE
student_id ON DELETE CASCADE ON UPDATE CASCADE
borrowed_date
This table, is a junction table for a Many to Many relationship with the Book and Student tables : A student can borrow many books, and a book can be borrowed by many children
book_fk_id is a Foreign Key representing the column book_id from the Book table
student_fk_id is a Foreign Key representing the column student_id from the Student table
The pair of Foreign Keys is the Primary Key of the Junction Table

Add 4 records in the junction table, use subqueries.
the student named John, borrowed the book Alice In Wonderland on the 15/02/2022
the student named Bob, borrowed the book To kill a mockingbird on the 03/03/2021
the student named Lera, borrowed the book Alice In Wonderland on the 23/05/2021
the student named Bob, borrowed the book Harry Potter the on 12/08/2021

Display the data
Select all the columns from the junction table
Select the name of the student and the title of the borrowed books
Select the average age of the children, that borrowed the book Alice in Wonderland
Delete a student from the Student table, what happened in the junction table ?*/

CREATE TABLE book (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL
);

INSERT INTO book (title, author) VALUES
('Alice In Wonderland', 'Lewis Carroll'),
('Harry Potter', 'J.K Rowling'),
('To kill a mockingbird', 'Harper Lee');

CREATE TABLE student (
    student_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    age INTEGER,
    CONSTRAINT chk_student_age CHECK (age <= 15)
);

INSERT INTO student (name, age) VALUES
('John', 12),
('Lera', 11),
('Patrick', 10),
('Bob', 14);

CREATE TABLE library (
    book_fk_id INTEGER,
    student_fk_id INTEGER,
    borrowed_date DATE NOT NULL,
    PRIMARY KEY (book_fk_id, student_fk_id),
    CONSTRAINT fk_library_book FOREIGN KEY (book_fk_id)
        REFERENCES book(book_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT fk_library_student FOREIGN KEY (student_fk_id)
        REFERENCES student(student_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

INSERT INTO library (book_fk_id, student_fk_id, borrowed_date)
VALUES (
    (SELECT book_id FROM book WHERE title = 'Alice In Wonderland' LIMIT 1),
    (SELECT student_id FROM student WHERE name = 'John' LIMIT 1),
    '2022-02-15'
);

INSERT INTO library (book_fk_id, student_fk_id, borrowed_date)
VALUES (
    (SELECT book_id FROM book WHERE title = 'To kill a mockingbird' LIMIT 1),
    (SELECT student_id FROM student WHERE name = 'Bob' LIMIT 1),
    '2021-03-03'
);

INSERT INTO library (book_fk_id, student_fk_id, borrowed_date)
VALUES (
    (SELECT book_id FROM book WHERE title = 'Alice In Wonderland' LIMIT 1),
    (SELECT student_id FROM student WHERE name = 'Lera' LIMIT 1),
    '2021-05-23'
);

INSERT INTO library (book_fk_id, student_fk_id, borrowed_date)
VALUES (
    (SELECT book_id FROM book WHERE title = 'Harry Potter' LIMIT 1),
    (SELECT student_id FROM student WHERE name = 'Bob' LIMIT 1),
    '2021-08-12'
);


SELECT * FROM library;

SELECT s.name, STRING_AGG(b.title, ', ' ORDER BY b.title)
  FROM student s
  LEFT JOIN library l ON l.student_fk_id = s.student_id
  LEFT JOIN book b ON b.book_id = l.book_fk_id
 GROUP BY s.name;

SELECT AVG(s.age) average_age
  FROM student s
 INNER JOIN library l ON l.student_fk_id = s.student_id
 INNER JOIN book b ON b.book_id = l.book_fk_id
 WHERE b.title = 'Alice In Wonderland';

 DELETE FROM student WHERE name = 'Bob'; --all rows associated with that student are automatically deleted from the library junction table

 SELECT * FROM student;
 SELECT * FROM library;
 SELECT * FROM book;