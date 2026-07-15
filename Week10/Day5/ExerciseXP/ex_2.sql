/*Exercise 2 : DVD Rental
Instructions
Use UPDATE to change the language of some films. Make sure that you use valid languages.

Which foreign keys (references) are defined for the customer table? How does this affect the way in which we INSERT into the customer table?

We created a new table called customer_review. Drop this table. Is this an easy step, or does it need extra checking?

Find out how many rentals are still outstanding (ie. have not been returned to the store yet).

Find the 30 most expensive movies which are outstanding (ie. have not been returned to the store yet)

Your friend is at the store, and decides to rent a movie. He knows he wants to see 4 movies, but he can’t remember their names. Can you help him find which movies he wants to rent?
The 1st film : The film is about a sumo wrestler, and one of the actors is Penelope Monroe.

The 2nd film : A short documentary (less than 1 hour long), rated “R”.

The 3rd film : A film that his friend Matthew Mahan rented. He paid over $4.00 for the rental, and he returned it between the 28th of July and the 1st of August, 2005.

The 4th film : His friend Matthew Mahan watched this film, as well. It had the word “boat” in the title or description, and it looked like it was a very expensive DVD to replace.*/

UPDATE film
SET language_id = 2
WHERE film_id = 1;

/* Foreign keys (references) defined for the customer table are:
store_id → References store(store_id)
address_id → References address(address_id).

Foreign keys act as strict structural guardrails. If you violate them, PostgreSQL will immediately block the query with a foreign key constraint violation error. 
*/

/*Dropping the customer_review table is easy step that does not require extra checking.
Because it is a Child Table:
While customer_review points to other tables (new_film and language), no other tables point to customer_review.
*/
DROP TABLE customer_review;

SELECT COUNT(*) AS outstanding_rentals
FROM rental
WHERE return_date IS NULL;

SELECT DISTINCT
    f.film_id,
    f.title AS film_title,
    f.replacement_cost,
    f.rental_rate
FROM rental r
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
WHERE r.return_date IS NULL
ORDER BY f.replacement_cost DESC, f.title ASC
LIMIT 30;

SELECT f.title 
  FROM film f 
 INNER JOIN film_actor fa ON f.film_id = fa.film_id 
 INNER JOIN actor a ON fa.actor_id = a.actor_id 
 WHERE UPPER(a.first_name) = 'PENELOPE' AND UPPER(a.last_name) = 'MONROE' 
   AND UPPER(f.description) LIKE '%SUMO%';

SELECT f.title FROM film f 
 INNER JOIN film_category fc ON f.film_id = fc.film_id 
 INNER JOIN category c ON fc.category_id = c.category_id 
 WHERE c.name = 'Documentary' AND f.length < 60 AND f.rating = 'R';

SELECT f.title FROM rental r 
 INNER JOIN customer c ON r.customer_id = c.customer_id 
 INNER JOIN payment p ON r.rental_id = p.rental_id 
 INNER JOIN inventory i ON r.inventory_id = i.inventory_id 
 INNER JOIN film f ON i.film_id = f.film_id 
 WHERE UPPER(c.first_name) = 'MATTHEW' AND UPPER(c.last_name) = 'MAHAN' 
   AND p.amount > 4.00 
   AND r.return_date BETWEEN '2005-07-28 00:00:00' AND '2005-08-01 23:59:59';

SELECT f.title FROM rental r 
 INNER JOIN customer c ON r.customer_id = c.customer_id 
 INNER JOIN inventory i ON r.inventory_id = i.inventory_id 
 INNER JOIN film f ON i.film_id = f.film_id 
 WHERE UPPER(c.first_name) = 'MATTHEW' AND UPPER(c.last_name) = 'MAHAN' 
   AND (UPPER(f.title) LIKE '%BOAT%' OR UPPER(f.description) LIKE '%BOAT%')
 ORDER BY f.replacement_cost DESC LIMIT 1;