/*Build a Random Quote Generator with React
Download this file containing a list of quotes and authors. You can also clone the repo.
You will display in a box :
a random quote as a header,
below the author of the quote,
and a button that when clicked on, calls a function that:
generates a new quote from the array of objects and replaces the current one. Make sure to not display the same quote twice.
changes randomly the color of the background, the color of the header quote and the color of the button.*/

import React, { useEffect, useState } from 'react';
import quotesData from './QuotesDatabase.js';

const colors = [
  '#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', 
  '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", 
  "#77B1A9", "#73A857", "#4f5d75", "#2d3142", "#007200"
];

const QuotesGenerator = () => {
  const [currentQuote, setCurrentQuote] = useState({ quote: '', author: '' });
  const [currentColor, setCurrentColor] = useState('#342224');
  const [remainingQuotes, setRemainingQuotes] = useState([...quotesData]);

  const generateNewQuote = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setCurrentColor(randomColor);

    let currentPool = [...remainingQuotes];

    if (currentPool.length === 0) {
      currentPool = [...quotesData];
    }

    const randomIndex = Math.floor(Math.random() * currentPool.length);
    const selectedQuote = currentPool[randomIndex];

    currentPool.splice(randomIndex, 1);

    setCurrentQuote(selectedQuote);
    setRemainingQuotes(currentPool);
  };

  useEffect(() => {
    generateNewQuote();
  }, []);

  return (
    <div style={{ padding: '20px', textAlign: 'center', minHeight: '100vh', backgroundColor: currentColor }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', borderRadius: '10px', backgroundColor: '#fff', color: currentColor }}>
      <h1 style={{color: currentColor }}>
          "{currentQuote.quote}"
        </h1>
        
        <p style={{color: currentColor }}>
          - {currentQuote.author || "Unknown"}
        </p>
        
        <button 
          onClick={generateNewQuote} 
          style={{backgroundColor: currentColor, color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer'}}
        >
          New Quote
        </button>
        </div>
    </div>
  );
};

export default QuotesGenerator;