import React from 'react';
import PropTypes from 'prop-types';

const ResultPanel = ({ score, totalQuestions, onRestart }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md text-center">
      <h2 className="text-2xl mb-4">Quiz Finished!</h2>
      <p className="text-xl mb-4">Your score: {score}/{totalQuestions}</p>
      <p className="text-lg text-gray-600 mb-4 font-bold">Thank you for participating!</p>
      <button
        onClick={onRestart}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Restart Quiz
      </button>
    </div>
  );
};

ResultPanel.propTypes = {
  score: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  onRestart: PropTypes.func.isRequired,
};

export default ResultPanel;