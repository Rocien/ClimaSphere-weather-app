import React from 'react';
import LocationCard from './LocationCard';
import './LocationBar.css';

// In the parameter it's receiving all the props from parent (APP.jsx)
function LocationBar({ locations, onRemoveLocation, onSelectLocation }) {
  return (
    <div className="container">
      <div className="location-bar">
        {locations.length ? (
          locations.map((location) => (
            // Here rendering a LocationCard for each location in the array
            <LocationCard
              key={location.id}
              location={location}
              onRemove={() => onRemoveLocation(location.id)}
              onSelect={() => onSelectLocation(location)}
            />
          ))
        ) : (
          // And this paragraph can only display if there are no locations to show
          <p className="location-info">No locations added yet.</p>
        )}
      </div>
    </div>
  );
}

export default LocationBar;
