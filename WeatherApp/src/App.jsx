import { useState, useEffect } from 'react'
import axios from 'axios'

import './App.css'

function App() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API}&q=${location}&days=7&aqi=yes&alerts=yes`)
        setWeatherData(response.data)
      } catch (error) {
        console.log(error)
      }
    };
    if (location) {
      fetchData();
    } else {
      setWeatherData(null);
    }
  }, [location])

  const handleLocationChange = (event) => {
    setLocation(event.target.value)
  }

  return (
    <>
      <div className='app-container'>
        <h1 className='app-title'> WEATHER APP </h1>
        <div className='input-container'>
          <input
            className='location-input'
            type='text'
            placeholder='Şehir Giriniz'
            value={location}
            onChange={handleLocationChange}
          />
        </div>
      </div>

      {weatherData && weatherData.forecast && weatherData.forecast.forecastday && (
        <div className='weather-container'>
          <div className='header'>
            <h2>
              3 Günlük Hava Tahmini
            </h2>
          </div>
          {weatherData.forecast.forecastday.map((day) => (
            <div className='day-container' key={day.date}>
              <h2 className='date'> {day.date} </h2>
              <img
                className='weather-icon'
                src={day.day.condition.icon}
              />
              <p className='temperature'> {day.day.avgtemp_c} °C </p>
              <p className='condition-text'> {day.day.condition.text} </p>
            </div>
          ))}
          
        </div>
      )}

    </>
  )
}

export default App
