import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboard } from '@fortawesome/free-solid-svg-icons';

const TitleBox = ({ title, subtitle }) => {
  return (
    <div className="flex items-center bg-gray-100 border border-gray-300 rounded-lg p-4 w-full shadow-md mb-4">
      {/* Icon */}
        <FontAwesomeIcon icon={faChalkboard} className="h-5 w-5" />

      {/* Title and subtitle */}
      <div className="ml-4">
        <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
      </div>
    </div>
  );
};

export default TitleBox;
