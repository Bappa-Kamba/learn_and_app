import React from 'react';

const ButtonPanel = ({ onKnown, onUnknown }) => {
  return (
    <div className="mt-4 flex justify-between">
      <button
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
        onClick={onKnown}
      >
        Known
      </button>
      <button
        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
        onClick={onUnknown}
      >
        Unknown
      </button>
    </div>
  );
};

export default ButtonPanel;
