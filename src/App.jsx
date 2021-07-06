import React, { useState } from 'react'

import { fetchWeather } from './api/fetchWeather';
import './App.css';

const App = () => {
  const [inputText, setInputText] = useState('');
  const [weather, setWeather] = useState(null);

  const search = async () => {
    const data = await fetchWeather(inputText);

    setWeather(data);
  }

  const handleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      await search();
      setInputText('');
    }
  }

  return (
    <div className="main-container">
      <input
        type="text"
        className="search"
        placeholder="Search..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      { weather && (
        <div className="city">
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h2>
          <div className="city-temp">
            {Math.round(weather.main.temp)}
            <sup>&deg;C</sup>
          </div>
          <div className="info">
            <img
              className="city-icon"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p>{weather.weather[0].description}</p>
          </div>
        </div>
      ) }
    </div>
  )
}

export default App;
