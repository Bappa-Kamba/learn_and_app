import React from 'react';

const ResultPanel = ({ score }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md text-center">
      <h2 className="text-2xl mb-4">Quiz Finished!</h2>
      <p className="text-xl">Your score: {score}</p>
    </div>
  );
};

export default ResultPanel;
