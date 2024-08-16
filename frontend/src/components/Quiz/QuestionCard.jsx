import React from 'react';
import PropTypes from 'prop-types';

const QuestionCard = ({ quiz }) => {
  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div className="question-card p-4 border rounded shadow">
      <h2 className="text-lg font-semibold">{quiz.question}</h2>
      <ul className="options mt-2">
        {quiz.options.map((option, index) => (
          <li key={index} className="option p-2 border rounded mt-1">
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
};

export default QuestionCard;
