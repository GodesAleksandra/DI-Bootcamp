/*Exercise 1: with JSX
Instructions
In the App.js file, display a “Hello World!” message in a paragraph.
Create a constant variable with JSX const myelement = <h1>I Love JSX!</h1>;, and render it on the page.
Create a constant variable named sum, which value is 5 + 5. Render on the page, the following sentence "React is <sum> 
times better with JSX"*/

import React from 'react';

function App() {
  const myelement = <h1>I Love JSX!</h1>;
  const sum = 5 + 5;

  return (
    <div>
      <p>Hello World!</p>
      {myelement}
      <p>React is {sum} times better with JSX</p>
    </div>
  );
}

export default App;