/*Exercise 3: Using useState Hook with TypeScript in React
Create a new Counter.tsx component
Implement state management for counter value
Add increment and decrement functionality
Track last action performed
Add proper TypeScript types for all state variables*/

import React, { useState } from 'react';

const Counter: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [lastAction, setLastAction] = useState<string>('');

  return (
    <div>
      <p>Count: {count}</p>
      <p>Last Action: {lastAction}</p>
      <button onClick={() => {setCount(count + 1); setLastAction('Increment');}}>Increment</button>
      <button onClick={() => {setCount(count - 1); setLastAction('Decrement');}}>Decrement</button>
    </div>
  );
};

export default Counter;