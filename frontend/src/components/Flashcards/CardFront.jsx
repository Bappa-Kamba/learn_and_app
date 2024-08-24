// CardFront.jsx
import React from 'react';

const CardFront = ({ content }) => {
  return (
    <div className="flashcard-front absolute w-full h-full flex items-center justify-center">
      <div>{content}</div>
    </div>
  );
};

export default CardFront;
