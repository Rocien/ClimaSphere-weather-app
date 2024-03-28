import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import './WeatherDisplay.css';

function WeatherDisplay({ location }) {
  const [weatherData, setWeatherData] = useState(null); // State to store fetched weather data

  // Function to fetch weather data from the OpenWeatherMap API
  const fetchWeatherData = async () => {
    if (!location) return; // This return to exit early if no location is selected

    // Here creating variables for my api url and key
    const apiKey = 'abe605e9339d49f8a6453cd5c439ff84';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url); // response variable to store the fetching
      const data = await response.json(); // data variable to store response json
      setWeatherData(data); // Updating the weatherData state with the new fetched data
    } catch (error) {
      console.error('Failed to fetch weather data:', error);
    }
  };

  // useEffect hook to re-fetch weather data when the selected location changes
  useEffect(() => {
    fetchWeatherData();
  }, [location]); // And this dependency array includes location to trigger re-fetching when it changes

  // Rendering logic based on the available data
  return (
    <div className="container">
      <div className="weather-display">
        {location ? (
          <>
            {/* The below h2 is the header title with the selected city name */}
            <h2 className="weather-title">Weather for {location.name}</h2>
            {weatherData ? (
              <>
                {/* Displaying weather icon based on the current weather */}
                {/* Collecting the icons from the api url*/}
                <img
                  className="weather-icon"
                  src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                  alt={weatherData.weather[0].description}
                  title={weatherData.weather[0].description}
                />
                {/* Showing weather description */}
                <p className="weather-description">Weather: {weatherData.weather[0].description}</p>
                {/* Current temperature */}
                <p className="temperature">Temperature: {weatherData.main.temp}°C</p>
                {/* Feels like temperature */}
                <p className="feelsLike">Feels Like: {weatherData.main.feels_like}°C</p>{' '}
                <p className="wind">Wind: {weatherData.wind.speed} m/s</p> {/* Wind speed */}
              </>
            ) : (
              <Loading /> // Showing the Loading component while fetching weather data
            )}
          </>
        ) : (
          // This will be showing when the location card is not selected yet
          <p className="weather-info">No Location Selected</p>
        )}
      </div>
    </div>
  );
}

export default WeatherDisplay;
