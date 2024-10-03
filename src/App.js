import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [city, setCity] = useState('New York');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (city.trim() === '') {
        setError('Masukkan Kota');
        return; // Hentikan eksekusi jika city kosong
      }
      
      setError(null); // Reset error saat memulai fetch
      setLoading(true); // Set loading true saat mulai fetch

      try {
        const apiKey = '1bbeb2a7dad55d959a3c73629a17e2b8';
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
        );
        setWeatherData(response.data);
      } catch (err) {
        setError('Terjadi kesalahan saat mengambil data cuaca');
      } finally {
        setLoading(false); // Set loading false setelah fetch selesai ss
      }
    };

    fetchWeatherData();
  }, [city]);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  // const chartData = () => {
  //   if (!weatherData) return {};

  //   const labels = weatherData.list.map((item) =>
  //     new Date(item.dt * 1000).toLocaleDateString()
  //   );
  //   const temperatures = weatherData.list.map((item) => item.main.temp);
  //   const humidities = weatherData.list.map((item) => item.main.humidity);

  //   return {
  //     labels,
  //     datasets: [
  //       {
  //         label: 'Temperature (°C)',
  //         data: temperatures,
  //         borderColor: 'rgba(255, 99, 132, 0.2)',
  //         backgroundColor: 'rgba(255, 99, 132, 0.2)',
  //       },
  //       {
  //         label: 'Humidity (%)',
  //         data: humidities,
  //         borderColor: 'rgba(54, 162, 235, 0.2)',
  //         backgroundColor: 'rgba(54, 162, 235, 0.2)',
  //       },
  //     ],
  //   };
  // };
  const isCityEmpty = city.trim() === '';
  const showError = isCityEmpty && !loading; // Tampilkan error jika city kosong dan data belum ada

  return (
    <div className="App">
      <div className="full-screen-bg"></div>
      <div className="search-bar">
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter a City..."
        />
      </div>
      <div className="container">
        {showError && <p className="error">{error}</p>}
        {weatherData && (
          <div className="weather-info">
            <div className={`today ${isCityEmpty ? 'hidden-h1' : ''}`}>
              <h2>Today github joko345</h2>
              {!isCityEmpty && <h1>{city}</h1>}
              <p>
                Temperature: {weatherData.list[0].main.temp}°C
              </p>
              <p>Condition: {weatherData.list[0].weather[0].description}</p>
            </div>
            <div className="forecast">
              <div className="day">
                <h3>Wednesday</h3>
                <img
                  src={`http://openweathermap.org/img/wn/${weatherData.list[1].weather[0].icon}@2x.png`}
                  alt="Weather Icon"
                />
                <p>21°C</p>
              </div>
              <div className="day">
                <h3>Thursday</h3>
                <img
                  src={`http://openweathermap.org/img/wn/${weatherData.list[2].weather[0].icon}@2x.png`}
                  alt="Weather Icon"
                />
                <p>24°C</p>
              </div>
              <div className="day">
                <h3>Friday</h3>
                <img
                  src={`http://openweathermap.org/img/wn/${weatherData.list[3].weather[0].icon}@2x.png`}
                  alt="Weather Icon"
                />
                <p>21°C</p>
              </div>
              <div className="day">
                <h3>Saturday</h3>
                <img
                  src={`http://openweathermap.org/img/wn/${weatherData.list[4].weather[0].icon}@2x.png`}
                  alt="Weather Icon"
                />
                <p>24°C</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
