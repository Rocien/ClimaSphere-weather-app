import { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import LocationBar from './components/LocationBar';
import FeedbackBar from './components/FeedbackBar';
import WeatherDisplay from './components/WeatherDisplay';
import './index.css';

function App() {
  const [locations, setLocations] = useState([]); // state for location, added [] as they will be an array of them
  const [selectedLocation, setSelectedLocation] = useState(null); // this stating to hold the selected location, added 'null' as nothing will show until selected location
  const [feedbackMessage, setFeedbackMessage] = useState(''); // state for feedback message

  const addLocation = (location) => {
    // This statement limits the number of locations to 6 maximum,
    if (locations.length >= 6) {
      // And here popping messages if the maximum is reached and user keep adding
      setFeedbackMessage('You have the maximum 6 locations. Remove one before adding another.');
      return;
    }
    // This checking for duplicate locations based on unique identifiers like city and country
    const isDuplicate = locations.some(
      (loc) => loc.name === location.name && loc.country === location.country
    );

    // This send the message to the user when there is a duplicate location
    if (isDuplicate) {
      setFeedbackMessage('This location is already on your list. Try adding a different one!');
      return;
    }

    // Here if it's not a duplicate, it add the location to the state
    setLocations((prevLocations) => [...prevLocations, location]); // Used spread operator to expand the existing locations array then append the new location
    setFeedbackMessage(''); // this clears feedback message upon successful addition
  };

  // Function to remove a location by id
  const onRemoveLocation = (locationId) => {
    setLocations(locations.filter((location) => location.id !== locationId));
  };

  // Function to handle selection of a location
  const onSelectLocation = (location) => {
    setSelectedLocation(location); // This update the state to the selected location
  };

  return (
    <>
      <Header />
      <SearchBar onAddLocation={addLocation} setFeedbackMessage={setFeedbackMessage} />
      {feedbackMessage && (
        <FeedbackBar message={feedbackMessage} onClose={() => setFeedbackMessage('')} />
      )}
      <LocationBar
        locations={locations} // Here passing the locations prop to LocationBar component (Child)
        onRemoveLocation={onRemoveLocation}
        onSelectLocation={onSelectLocation}
      />
      <WeatherDisplay location={selectedLocation} />
    </>
  );
}

export default App;
