import React from 'react';
import PropTypes from 'prop-types';

const QuestionCard = ({ 
  question, 
  options, 
  selectedOption, 
  onOptionSelect, 
  onNext, 
  onPrevious, 
  onSubmit,
  isFirstQuestion,
  isLastQuestion,
  timeLeft 
}) => {
  const optionClass = (option) => `
    p-3 mb-2 rounded cursor-pointer transition-colors
    ${selectedOption === option 
      ? 'bg-blue-200 font-bold' 
      : 'bg-gray-100 hover:bg-gray-200'}
  `;

  return (
    <div className="question-card p-4 border rounded shadow">
      <span className="text-gray-500">{`Time Left: ${timeLeft} seconds`}</span>
      <h2 className="text-xl font-bold mb-4">{question}</h2>
      <ul className="options mt-2">
        {options.map((option, index) => (
          <li
            key={index}
            className={optionClass(option)}
            onClick={() => onOptionSelect(option)}
          >
            {option}
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-between items-center">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded shadow-md"
          onClick={onPrevious}
          disabled={isFirstQuestion}
        >
          Previous
        </button>
        {isLastQuestion ? (
          <button
            className="bg-green-500 text-white px-4 py-2 rounded shadow-md"
            onClick={onSubmit}
          >
            Submit
          </button>
        ) : (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded shadow-md"
            onClick={onNext}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

QuestionCard.propTypes = {
  question: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedOption: PropTypes.string,
  onOptionSelect: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isFirstQuestion: PropTypes.bool.isRequired,
  isLastQuestion: PropTypes.bool.isRequired,
  timeLeft: PropTypes.number.isRequired,
};

export default QuestionCard;