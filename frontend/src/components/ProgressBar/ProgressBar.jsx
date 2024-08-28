import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const ProgressBar = ({ progress, total, context = 'quiz' }) => {
  if (total === 0) {
    return (
      <div className="relative w-24 h-24 mx-auto mb-4">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-gray-500">0/0</span>
        </div>
      </div>
    );
  }

  const percentage = (progress / total) * 100;
  const circumference = 2 * Math.PI * 45; // 45 is the radius of the circle
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const progressColor = context === 'quiz' ? 'text-green-600' : 'text-blue-600';


  return (
    <div className="relative w-24 h-24 mx-auto mb-4">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          className="text-gray-200 stroke-current"
          strokeWidth="10"
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
        />
        {/* Progress circle */}
        <motion.circle
          className={`${progressColor} progress-ring__circle stroke-current`}
          strokeWidth="10"
          strokeLinecap="round"
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          style={{
            strokeDasharray: `${circumference} ${circumference}`,
            transform: 'rotate(-90deg)',
            transformOrigin: 'center',
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`text-lg font-bold ${progressColor}`}>
          {progress}/{total}
        </span>
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  context: PropTypes.oneOf(['quiz', 'flashcard']),
};

export default ProgressBar;
