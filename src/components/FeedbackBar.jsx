import React, { useEffect } from 'react';
import './FeedbackBar.css';

function FeedbackBar({ message, onClose }) {
  // Using useEffect to set a timeout when the component mounts
  useEffect(() => {
    // Here setting a timeout to automatically call onClose after 3 seconds (3000 milliseconds)
    const timer = setTimeout(() => {
      onClose(); // This will clear the message in the parent component's state
    }, 3000);

    // Cleanup function to clear the timeout if the component unmounts earlier
    return () => clearTimeout(timer);
  }, [onClose]); // Dependencies array includes onClose to reset the timer if the function changes

  return (
    <div className="container">
      <div className="feedback-bar">
        {message}
        <button className="feedback-close" onClick={onClose}>
          X
        </button>{' '}
        {/* Button to manually close the feedback message */}
      </div>
    </div>
  );
}

export default FeedbackBar;
