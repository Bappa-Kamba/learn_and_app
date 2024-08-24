// ReviewCard.jsx
import React from 'react';
import PropTypes from 'prop-types';

const ReviewCard = ({ question, options, userAnswer, correctAnswer }) => {
  const optionClass = (option) => `
    p-3 mb-2 rounded
    ${option === correctAnswer 
      ? 'bg-green-200' 
      : option === userAnswer && option !== correctAnswer
        ? 'bg-red-200'
        : 'bg-gray-100'}
  `;

  return (
    <div className="review-card p-4 border rounded shadow mb-4">
      <h2 className="text-xl font-bold mb-4">{question}</h2>
      <ul className="options mt-2">
        {options.map((option, index) => (
          <li
            key={index}
            className={optionClass(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

ReviewCard.propTypes = {
  question: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  userAnswer: PropTypes.string,
  correctAnswer: PropTypes.string.isRequired,
};

export default ReviewCard;