import React from 'react';

const Toast = ({ message, onClose }) => {
  return (
    <div className="fixed bottom-5 right-5 bg-gray-500 text-white px-4 py-2 rounded-lg shadow-lg transition-opacity duration-300 ease-in-out">
      <p>{message}</p>
    </div>
  );
};

export default Toast;
