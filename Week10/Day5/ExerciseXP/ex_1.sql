/*Exercise 1: DVD Rental
Instructions
Get a list of all the languages, from the language table.

Get a list of all films joined with their languages – select the following details : film title, description, and language name.

Get all languages, even if there are no films in those languages – select the following details : film title, description, and language name.

Create a new table called new_film with the following columns : id, name. Add some new films to the table.

Create a new table called customer_review, which will contain film reviews that customers will make.
Think about the DELETE constraint: if a film is deleted, its review should be automatically deleted.
It should have the following columns:
review_id – a primary key, non null, auto-increment.
film_id – references the new_film table. The film that is being reviewed.
language_id – references the language table. What language the review is in.
title – the title of the review.
score – the rating of the review (1-10).
review_text – the text of the review. No limit on the length.
last_update – when the review was last updated.

Add 2 movie reviews. Make sure you link them to valid objects in the other tables.

Delete a film that has a review from the new_film table, what happens to the customer_review table?*/

SELECT * FROM language;

SELECT f.title, f.description, l.name AS language 
  FROM film f
 INNER JOIN language l ON l.language_id = f.language_id;

SELECT f.title, f.description, l.name AS language 
  FROM film f
 FULL OUTER JOIN language l ON l.language_id = f.language_id
ORDER BY l.name;

CREATE TABLE new_film (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

INSERT INTO new_film (name) VALUES 
('Inception'),
('The Matrix'),
('Interstellar'),
('Spirited Away');

CREATE TABLE customer_review (
    review_id SERIAL PRIMARY KEY,
    film_id INT NOT NULL,
    language_id INT NOT NULL,
    title VARCHAR(255),
    score INT CHECK (score >= 1 AND score <= 10),
    review_text TEXT,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_review_film FOREIGN KEY (film_id) REFERENCES new_film(id) ON DELETE CASCADE,
    CONSTRAINT fk_review_language FOREIGN KEY (language_id) REFERENCES language(language_id)
);

INSERT INTO customer_review (film_id, language_id, title, score, review_text)
VALUES 
(
    2, 
    1, 
    'A Timeless Masterpiece!', 
    10, 
    'The Matrix is an absolute classic. The pacing is wonderful and the story is incredibly engaging for all ages. Highly recommended!'
),
(
    1, 
    1, 
    'Decent Action, Weak Plot', 
    6, 
    'Inception has some highly entertaining action sequences, but the storyline feels a bit predictable and rushed in the second half.'
);

/*When delete a film from the new_film table, the corresponding review in the customer_review table is automatically and permanently deleted.This happens because of the ON DELETE CASCADE constraint defined on the film_id foreign key*/

DELETE FROM new_film WHERE id = 1;

SELECT * FROM customer_review WHERE film_id = 1;