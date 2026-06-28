-- Database: Hollywood

-- DROP DATABASE IF EXISTS "Hollywood";

/*CREATE DATABASE "Hollywood"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Russian_Russia.1251'
    LC_CTYPE = 'Russian_Russia.1251'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;*/

CREATE TABLE actors(
 actor_id SERIAL PRIMARY KEY,
 first_name VARCHAR (50) NOT NULL,
 last_name VARCHAR (100) NOT NULL,
 age DATE NOT NULL,
 number_oscars SMALLINT NOT NULL
);

INSERT INTO actors (first_name, last_name, age, number_oscars)
VALUES('Matt','Damon','08/10/1970', 5);

INSERT INTO actors (first_name, last_name, age, number_oscars)
VALUES('George','Clooney','06/05/1961', 2);

INSERT INTO actors (first_name, last_name, age, number_oscars)
VALUES ('Scarlett', 'Johansson', '22/11/1984', 0);

INSERT INTO actors (first_name, last_name, age, number_oscars)
VALUES ('Natalie', 'Portman', '09/06/1981', 1);

INSERT INTO actors (first_name, last_name, age, number_oscars) 
VALUES
    ('Meryl', 'Streep', '22/06/1949', 3),
    ('Leonardo', 'DiCaprio', '11/11/1974', 1),
    ('Viola', 'Davis', '11/08/1965', 1);

UPDATE actors SET age='1970-01-01' WHERE first_name='Matt' AND last_name='Damon';

DELETE FROM actors WHERE actor_id=4
RETURNING actor_id, first_name, last_name, number_oscars;

SELECT COUNT(*) AS total_actors FROM actors;

INSERT INTO actors (first_name, last_name, age, number_oscars) 
VALUES ('Tom', 'Hardy', NULL, NULL); --ERROR: null value in column "age" of relation "actors" violates not-null constraint