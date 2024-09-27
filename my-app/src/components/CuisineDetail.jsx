import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

const CuisineDetail = () => {
  const { cuisine } = useParams();
  const location = useLocation();
  
  // Access the description from the passed state
  const { description } = location.state || {};  // Fallback to undefined if no state is passed

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">{cuisine}</h1>
      {description ? (
        <p className="text-lg text-gray-600">{description}</p>
      ) : (
        <p className="text-lg text-gray-600">Loading...</p>
      )}
    </div>
  );
};

export default CuisineDetail;
