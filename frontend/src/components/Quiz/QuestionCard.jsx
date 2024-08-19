import React from 'react';
import PropTypes from 'prop-types';

const QuestionCard = ({ quiz, onOptionSelect, selectedOption }) => {
  if (!quiz) {
    return <div>Loading...</div>;
  }

  const optionClass = (option) => `
    p-3 mb-2 rounded cursor-pointer transition-colors
    ${selectedOption 
      ? selectedOption === option
        ? option === quiz.answer
          ? 'bg-green-200 font-bold'
          : 'bg-red-200 font-bold'
        : 'bg-gray-100 opacity-50'
      : 'bg-gray-100 hover:bg-gray-200'}
  `;

  return (
    <div className="question-card p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">{quiz.question}</h2>
      <ul className="options mt-2">
        {quiz.options.map((option, index) => (
          <li
            key={index}
            className={optionClass(option)}
            onClick={() => !selectedOption && onOptionSelect(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

QuestionCard.propTypes = {
  quiz: PropTypes.shape({
    question: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
    answer: PropTypes.string,
  }),
  onOptionSelect: PropTypes.func.isRequired,
  selectedOption: PropTypes.string,
};

export default QuestionCard;