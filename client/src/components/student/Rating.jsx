import React, { useState, useEffect } from 'react';

const Rating = ({ initialRating, onRate }) => {
  const [rating, setRating] = useState(initialRating || 0);

  const handleRating = (value) => {
    setRating(value);
    if (onRate) onRate(value);
  };

  useEffect(() => {
    if (initialRating) {
      setRating(initialRating);
    }
  }, [initialRating]);

  return (
    <div className="flex">
      {Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1;
        return (
          <span 
            key={index} 
            className={`text-2xl sm:text-3xl cursor-pointer transition-colors ${
              starValue <= rating ? 'text-yellow-500' : 'text-gray-300'
            }`}
            onClick={() => handleRating(starValue)}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

export default Rating;