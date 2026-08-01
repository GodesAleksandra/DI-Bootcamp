/*Exercise 4 : useEffect hook
Create a new Functional Component named Color, with a state variable favoriteColor which value is “red”.
Output the value in a header tag.
Note : The useEffect() hook is called after the component is rendered.
In the useEffect(), alert “useEffect reached”

Note: The return is called when a component gets updated. It re-renders the DOM, with the new changes.
Create a button that when clicked on, calls a function that changes the value of the favoriteColor property to “blue”.*/

import React, { useState, useEffect } from 'react';

const Color = () => {
    const [favoriteColor, setFavoriteColor] = useState("red");

    const changeFavoriteColor = () => {
        setFavoriteColor("blue");
    }

     useEffect(() => { 
        alert("useEffect reached");
        if (favoriteColor === 'red') {
            setFavoriteColor('yellow');
        }
    }, [favoriteColor]);

    return (
        <div>
            <h1>My favorite color is {favoriteColor}</h1>
            <button type="button" onClick={changeFavoriteColor}> Change color</button>
        </div>
    )
};

export default Color;