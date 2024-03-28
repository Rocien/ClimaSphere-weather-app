import React, { useState } from 'react';
import './SearchBar.css';
import { IoSearch } from 'react-icons/io5';

function SearchBar({ onAddLocation, setFeedbackMessage }) {
  // Above in the SearchBar function i added props parameter to receive the onAddLocation function from the parent App component
  const [inputValue, setInputValue] = useState(''); // Stating a variable for the input field value

  // Handler for input value change
  const handleInputChange = (e) => {
    setInputValue(e.target.value); // Updating state with new input value
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Preventing default form submission behavior
    if (!inputValue.trim()) {
      setFeedbackMessage('Please enter a valid location.'); // Validates user input
      return;
    }
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
          inputValue
        )}&appid=abe605e9339d49f8a6453cd5c439ff84`
      );
      const data = await response.json(); // Parse JSON response
      if (data && data.length > 0) {
        const info = data[0];

        // Creating a location object with the necessary details
        let location = {
          id: crypto.randomUUID(),
          lat: info.lat,
          lon: info.lon,
          country: info.country,
          name: info.name
        };
        onAddLocation(location); // Passing the location object up to the App component
        setInputValue(''); // Here it clear the input field after successful location addition
      } else {
        // Handle the case where no matching locations are found
        setFeedbackMessage('No matching locations.');
      }
    } catch (error) {
      setFeedbackMessage('Failed to fetch location. Please try again.'); // Setting feedback message on error
    }
  };

  return (
    <div className="container">
      <div className="search-bar">
        <form onSubmit={handleSubmit}>
          <div className="search-form">
            <label htmlFor="location-input">City, Province, Country</label>
            <input
              id="location-input"
              className="search-input"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter location"
            />
            <button className="btn-search btn" type="submit">
              <IoSearch />
              Find Location
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SearchBar;
