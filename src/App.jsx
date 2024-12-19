import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeatherData = async (cityName) => {
    try {
      setError(null);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=8ac5c4d57ba6a4b3dfcf622700447b1e&units=metric`
      );
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setWeatherData(null);
      setError(err.message);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim() === "") {
      setError("Please enter a city name.");
      return;
    }
    fetchWeatherData(city);
  };

  const getWeatherIcon = (icon) => {
    return `http://openweathermap.org/img/wn/${icon}@2x.png`;
  };

  return (
    <div className="app-container">
      <header>
        <h1 className="title">Weather App</h1>
      </header>

      <main>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}

        {weatherData && (
          <div className="weather-info">
            <h2>{weatherData.name}</h2>
            <img src={getWeatherIcon(weatherData.weather[0].icon)} alt={weatherData.weather[0].description} className="weather-icon" />
            <p>
              <strong>Temperature:</strong> {weatherData.main.temp}°C
            </p>
            <p>
              <strong>Feels Like:</strong> {weatherData.main.feels_like}°C
            </p>
            <p>
              <strong>Weather:</strong> {weatherData.weather[0].description}
            </p>
            <p>
              <strong>Humidity:</strong> {weatherData.main.humidity}%
            </p>
            <p>
              <strong>Wind Speed:</strong> {weatherData.wind.speed} m/s
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;