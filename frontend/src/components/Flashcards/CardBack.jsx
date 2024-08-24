// CardBack.jsx
import React from 'react';

const CardBack = ({ content }) => {
  return (
    <div
        className="flashcard-back absolute w-full h-full flex items-center justify-center">
      <div>{content}</div>
    </div>
  );
};

export default CardBack;
