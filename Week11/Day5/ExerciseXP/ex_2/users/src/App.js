/*Exercise 2 : Object
Instructions
Using the following object:

const user = {
  firstName: 'Bob',
  lastName: 'Dylan',
  favAnimals : ['Horse','Turtle','Elephant','Monkey']
};
In the App.js file, render the first name and the last name of the user in two <h3>.
In a separate Javascript file named UserFavoriteAnimals.js, create a new Class Component called UserFavoriteAnimals. 
Use props to pass the favAnimals array to the UserFavoriteAnimals component.
In the UserFavoriteAnimals component, use the map method to create <li> tags in a <ul> tag.
Each <li> corresponds to one animal from the favAnimals array.
Display the <li> tags. Tip : You can use the second parameter of the map function as a key to uniquely identify each HTML item*/

import logo from './logo.svg';
import './App.css';
import React from 'react';
import UserFavoriteAnimals from './UserFavoriteAnimals';

function App() {

  const user = {
    firstName: 'Bob',
    lastName: 'Dylan',
    favAnimals : ['Horse','Turtle','Elephant','Monkey']
  };

  return (
    <div className="App">
      <h3>{user.firstName}</h3>
      <h3>{user.lastName}</h3>
      <UserFavoriteAnimals animals={user.favAnimals} />
    </div>
  );
}

export default App;
