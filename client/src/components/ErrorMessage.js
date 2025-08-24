import React from 'react';

const ErrorMessage = ({ message }) => {
  return <div className="centered" style={{ color: 'red' }}>Error: {message}</div>;
};

export default ErrorMessage;