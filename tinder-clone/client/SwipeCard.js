import React from 'react';

const SwipeCard = ({ user, onSwipe }) => {
  const handleSwipe = (direction) => {
    onSwipe(direction, user);
  };

  return (
    <div className="swipe-card">
      <img src={user.image} alt={user.name} />
      <h3>{user.name}</h3>
      <button onClick={() => handleSwipe('left')}>Left</button>
      <button onClick={() => handleSwipe('right')}>Right</button>
    </div>
  );
};

export default SwipeCard;
