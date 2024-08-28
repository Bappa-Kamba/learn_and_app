import React from 'react';

const QuizModal = ({ show, onClose, onConfirm, onCancel }) => {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50"
      aria-labelledby="modal-title"
      aria-modal="true"
    >
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md mx-4 relative">
        <h2 id="modal-title" className="text-xl font-semibold text-gray-800 mb-4">
          🎉 Congratulations!
        </h2>
        <p className="text-md text-gray-600 mb-4">
          You've completed all the flashcards. Would you like to take a quiz based on the cards you've mastered?
        </p>
        <div className="flex justify-center gap-4 mb-4">
          <button
            onClick={onConfirm}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Yes, let's quiz!
          </button>
          <button
            onClick={onCancel}
            className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-600 transition-colors duration-200"
          >
            No, maybe later
          </button>
        </div>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          aria-label="Close modal"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default QuizModal;
