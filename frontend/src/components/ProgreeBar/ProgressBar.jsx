import React from 'react';
import PropTypes from 'prop-types';

const ProgressBar = ({ progress, total }) => {
  const percentage = (progress / total) * 100;
  const circumference = 2 * Math.PI * 45; // 45 is the radius of the circle
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-24 h-24 mx-auto mb-4">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          className="text-gray-200 stroke-current"
          strokeWidth="10"
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
        />
        <circle
          className="text-blue-600 progress-ring__circle stroke-current"
          strokeWidth="10"
          strokeLinecap="round"
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
          style={{
            strokeDasharray: `${circumference} ${circumference}`,
            strokeDashoffset: strokeDashoffset,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold">
          {progress}/{total}
        </span>
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default ProgressBar;