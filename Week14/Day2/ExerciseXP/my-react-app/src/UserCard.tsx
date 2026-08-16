/*Exercise 4: Creating a React Component with Optional Props
Create a new UserCard.tsx component
Define interface with optional name, age, and role props
Implement default values for optional props
Test component with various prop combinations*/

import React from 'react';

interface UserCardProps {
  name?: string;
  age?: number;
  role?: string;
}

const UserCard: React.FC<UserCardProps> = ({ name = "Unknown", age = 0, role = "User" }) => {
  return (
    <div>
      <h3>{name}</h3>
      <p>Age: {age}</p>
      <p>Role: {role}</p>
    </div>
  );
};

export default UserCard;