/*Exercise 3 : Phone and components
Part I : Phone
Create a new Functional Component named Phone. Use the state hook to create the following state variables:
brand: "Samsung"
model: "Galaxy S20"
color: "black"
year: 2020

In the return of the Phone component, display the values of the state variables.
Import the Phone component and display it in your App.js.

Part II : Change the Phone
In the Phone component create a function named changeColor that updates the state variable to ‘blue’.
In the return, add a button with an onClick event that will call the changeColor function to change the color state variable.*/

import React, { useState } from 'react';

const Phone = () => {
    const [brand, setBrand] = useState("Samsung");
    const [model, setModel] = useState("Galaxy S20");
    const [color, setColor] = useState("black");
    const [year, setYear] = useState(2020);

    const changeColor = () => {
        setColor("blue");
    }

    return (
        <div>
            <h1>My phone is a {brand}</h1>
            <h2>It is a {color} {model} from {year}</h2>
            <button type="button" onClick={changeColor}> Change color</button>
        </div>
    )
};

export default Phone;