import React from 'react';
import PropTypes from 'prop-types';

const Flashcard = ({ flashcard }) => {
  if (!flashcard) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flashcard p-4 border rounded shadow">
      <h2 className="text-lg font-semibold">{flashcard.language}</h2>
      <p>{flashcard.description}</p>
    </div>
  );
};

Flashcard.propTypes = {
  flashcard: PropTypes.shape({
    language: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default Flashcard;
