-- Database: public

 DROP DATABASE IF EXISTS public;

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

CREATE TABLE items(
 item_id SERIAL PRIMARY KEY,
 name VARCHAR (100) NOT NULL,
 price INTEGER NOT NULL
);

CREATE TABLE customers(
 customer_id SERIAL PRIMARY KEY,
 first_name VARCHAR (50) NOT NULL,
 last_name VARCHAR (100) NOT NULL
)

INSERT INTO items (name, price)
VALUES('Small Desk',100);

INSERT INTO items (name, price)
VALUES('Large Desk',300);

INSERT INTO items (name, price)
VALUES('Fan',80);

INSERT INTO customers (first_name, last_name)
VALUES('Greg','Jones');

INSERT INTO customers (first_name, last_name)
VALUES('Sandra','Jones');

INSERT INTO customers (first_name, last_name)
VALUES('Scott','Scott');

INSERT INTO customers (first_name, last_name)
VALUES('Trevor','Green');

INSERT INTO customers (first_name, last_name)
VALUES('Melanie','Johnson');

SELECT * FROM items;
SELECT * FROM items WHERE price > 80;
SELECT * FROM items WHERE price <= 300;

SELECT * FROM customers WHERE last_name = 'Smith';
SELECT * FROM customers WHERE last_name = 'Jones';
SELECT * FROM customers WHERE first_name <> 'Scott';