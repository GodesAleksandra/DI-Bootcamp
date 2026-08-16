//import { useState } from 'react';
import './App.css';
//import React from 'react';
import Greeting from './Greeting';
import Counter from './Counter';
import UserCard from './UserCard';
import UserList from './UserList';

function App() {
  return (
    <div className="App" style={{ padding: '20px' }}>
      <Greeting 
        name="Mike" 
        messageCount={3}
      />

      <Greeting 
        name="Kate" 
        messageCount={5}
      />

      <Counter />

      <UserCard name="Alice" age={30} role="Admin" />
      <UserCard age={25} role="User" />
      <UserCard />

      <UserList />
    </div>
  );
}

export default App;
