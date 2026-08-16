/*Exercise 5: Using useEffect Hook with TypeScript in React
Create a new UserList.tsx component
Define User interface for API data
Implement loading and error states
Fetch and display user data from the API https://jsonplaceholder.typicode.com/users. Use the useEffect hook to fetch data from the API when the component mounts.
Handle potential errors properly
Display the fetched data in the component.
Success Criteria:

Data fetches and displays correctly
Loading state shows while fetching
Errors are properly handled and displayed
All API data is properly typed */

import React, { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          setLoading(true);
          const response = await fetch('https://jsonplaceholder.typicode.com/users');
          if (!response.ok) {
            throw new Error('Failed to fetch users');
          }
          const data: User[] = await response.json();
          setUsers(data);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
          setLoading(false);
        }
      };

      fetchUsers();
    }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;