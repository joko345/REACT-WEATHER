import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './App.css';

const App = () => {
    const [city, setCity] = useState('London');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState('');
    
    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                // Replace 'YOUR_API_KEY' with your actual API key
                const apiKey = '1bbeb2a7dad55d959a3c73629a17e2b8';
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
                setWeatherData(response.data);
            } catch (err) {
                setError('Unable to fetch data. Please try again.');
            }
        };

        fetchWeatherData();
    }, [city]);

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    const chartData = () => {
        if (!weatherData) return {};

        const labels = weatherData.list.map(item => new Date(item.dt * 1000).toLocaleDateString());
        const temperatures = weatherData.list.map(item => item.main.temp);
        const humidities = weatherData.list.map(item => item.main.humidity);

        return {
            labels,
            datasets: [
                {
                    label: 'Temperature (°C)',
                    data: temperatures,
                    borderColor: 'rgba(255, 99, 132, 0.2)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                },
                {
                    label: 'Humidity (%)',
                    data: humidities,
                    borderColor: 'rgba(54, 162, 235, 0.2)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                }
            ]
        };
    };

    return (
        <div className="App">
            <h1>Weather Forecast</h1>
            <input 
                type="text" 
                value={city} 
                onChange={handleCityChange} 
                placeholder="Enter city name" 
            />
            {error && <p>{error}</p>}
            {weatherData && (
                <div>
                    <h2>Current Weather in {city}</h2>
                    <p>Condition: {weatherData.list[0].weather[0].description}</p>
                    <p>Temperature: {weatherData.list[0].main.temp}°C</p>
                    <p>Humidity: {weatherData.list[0].main.humidity}%</p>
                    <p>Wind Speed: {weatherData.list[0].wind.speed} m/s</p>
                    <p>Date and Time: {new Date(weatherData.list[0].dt * 1000).toLocaleString()}</p>
                    <Line data={chartData()} />
                </div>
            )}
        </div>
    );
};

export default App;
