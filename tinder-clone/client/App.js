import React, { useState, useEffect } from 'react';
import SwipeCard from './SwipeCard';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  const handleSwipe = async (direction, user) => {
    await axios.post('/api/swipe', { direction, userId: user._id });
  };

  return (
    <div className="app">
      {users.map(user => (
        <SwipeCard key={user._id} user={user} onSwipe={handleSwipe} />
      ))}
    </div>
  );
};

export default App;