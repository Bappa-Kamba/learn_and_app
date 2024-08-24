import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const Flashcard = ({ front, back, currentFlashcard }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    setIsFlipped(false);
  }, [currentFlashcard]);

  return (
    <div
      className="flashcard-container bg-white border border-gray-300 rounded shadow-lg p-6 text-center h-64 w-full relative flex items-center justify-center cursor-pointer"
      onClick={handleFlip}
      role="button"
      aria-pressed={isFlipped}
      tabIndex="0"
      style={{
        perspective: '1000px',
      }}
    >
      <motion.div
        className="flashcard-inner"
        initial={{ rotateY: 0 }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Front Side */}
        <motion.div
          className="flashcard-front bg-blue-500 text-white rounded shadow p-6 flex items-center justify-center"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
          }}
        >
          <div className="text-2xl font-semibold">{front}</div>
        </motion.div>

        {/* Back Side */}
        <motion.div
          className="flashcard-back bg-green-500 text-white rounded shadow p-6 flex items-center justify-center"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)', // Rotate the back side to flip it correctly
          }}
        >
          <div className="text-2xl font-semibold">{back}</div>
        </motion.div>
      </motion.div>
    </div>
  );
};

Flashcard.propTypes = {
  front: PropTypes.string.isRequired,
  back: PropTypes.string.isRequired,
  currentFlashcard: PropTypes.number.isRequired,
};

export default Flashcard;
