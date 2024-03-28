import React, { useState, useEffect } from 'react';
import './Loading.css';

function Loading() {
  const [dots, setDots] = useState(''); // This the state for loading

  // This useEffect to keep the dots running, added ternary operator to create dots
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length < 3 ? prevDots + '.' : ''));
    }, 600); // This keep change dots count every 600ms

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-container">
      <p>Loading{dots}</p>
    </div>
  );
}

export default Loading;
