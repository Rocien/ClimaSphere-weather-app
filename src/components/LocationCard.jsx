import React from 'react';
import './LocationCard.css';

function LocationCard({ location, onRemove, onSelect }) {
  return (
    <div className="container">
      <div className="location-card" onClick={onSelect}>
        <div className="location-name">{location.name}</div>
        <div className="location-country">{location.country}</div>
        <div className="location-remove">
          <button
            className="btn"
            onClick={(e) => {
              e.stopPropagation(); // Added this to prevent the event from bubbling up
              onRemove(); // This function remove location
            }}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default LocationCard;
