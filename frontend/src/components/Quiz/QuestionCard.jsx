import React from 'react';

const QuestionCard = ({ question, onAnswer }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl mb-4">{question.text}</h2>
      <div className="flex justify-between">
        <button
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
          onClick={() => onAnswer(true)}
        >
          True
        </button>
        <button
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
          onClick={() => onAnswer(false)}
        >
          False
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;
