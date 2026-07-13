/*Exercise 1 : Items and customers
Use SQL to get the following from the database:
All items, ordered by price (lowest to highest).
Items with a price above 80 (80 included), ordered by price (highest to lowest).
The first 3 customers in alphabetical order of the first name (A-Z) – exclude the primary key column from the results.
All last names (no other columns!), in reverse alphabetical order (Z-A)*/

-- Database: public

-- DROP DATABASE IF EXISTS public;

CREATE DATABASE public
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Russian_Russia.1251'
    LC_CTYPE = 'Russian_Russia.1251'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

SELECT * FROM items ORDER BY price ASC;
SELECT * FROM items WHERE price >= 80 ORDER BY price DESC;
SELECT first_name, last_name FROM customers ORDER BY first_name ASC LIMIT 3;
SELECT last_name FROM customers ORDER BY last_name DESC;