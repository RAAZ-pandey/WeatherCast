import React, { useState, useEffect } from 'react';
import { MapPin, Search, Cloud, Sun, CloudRain, Snowflake, Wind, Eye, Droplets, Thermometer, Navigation } from 'lucide-react';
import WeatherMap from './WeatherMap';
import ForecastCard from './ForecastCard';
import WeatherDetails from './WeatherDetails';
import axios from 'axios';

const WeatherApp = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [location, setLocation] = useState({ lat: null, lon: null, name: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMap, setShowMap] = useState(false);

  
  const API_KEY =  import.meta.env.VITE_OPENWEATHER_API_KEY;
  
  
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lon: longitude, name: '' });
          fetchWeatherData(latitude, longitude);
        },
        (error) => {
          console.log('Geolocation error:', error);
          // Default to London if geolocation fails
          fetchWeatherData(51.5074, -0.1278);
          setLocation({ lat: 51.5074, lon: -0.1278, name: 'London' });
        }
      );
    } else {
      // Default to London if geolocation not supported
      fetchWeatherData(51.5074, -0.1278);
      setLocation({ lat: 51.5074, lon: -0.1278, name: 'London' });
    }
  }, []);

  const fetchWeatherData = async (lat, lon) => {
    try {
      setLoading(true);
      setError(null);

      

      // Fetch current weather
      const currentResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );

      // Fetch 5-day forecast
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );

      setCurrentWeather(currentResponse.data);
      
      // Process forecast data to get daily forecasts
      const dailyForecasts = forecastResponse.data.list
        .filter((_, index) => index % 8 === 0) // Get every 8th item (24 hours apart)
        .slice(0, 5);
      
      setForecast(dailyForecasts);
      setLocation(prev => ({ ...prev, name: currentResponse.data.name }));
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError('Please add your OpenWeather API key to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const searchLocation = async (query) => {
    if (!query.trim()) return;
    
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${API_KEY}`
      );
      
      if (response.data.length > 0) {
        const { lat, lon, name } = response.data[0];
        setLocation({ lat, lon, name });
        await fetchWeatherData(lat, lon);
        setSearchQuery('');
      }
    } catch (err) {
      console.error('Error searching location:', err);
      setError('Error searching for location');
    }
  };

  const getWeatherIcon = (condition) => {
    const iconMap = {
      'clear': Sun,
      'clouds': Cloud,
      'rain': CloudRain,
      'snow': Snowflake,
      'default': Cloud
    };
    
    const iconKey = condition?.toLowerCase() || 'default';
    return iconMap[iconKey] || iconMap.default;
  };

  const getBackgroundGradient = (condition) => {
    const gradients = {
      'clear': 'from-blue-400 via-blue-500 to-blue-600',
      'clouds': 'from-gray-400 via-gray-500 to-gray-600',
      'rain': 'from-gray-600 via-gray-700 to-gray-800',
      'snow': 'from-blue-200 via-blue-300 to-blue-400',
      'default': 'from-blue-400 via-purple-500 to-purple-600'
    };
    
    const condition_key = condition?.toLowerCase() || 'default';
    return gradients[condition_key] || gradients.default;
  };

  if (loading && !currentWeather) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-purple-600 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-xl font-semibold">Loading weather data...</p>
        </div>
      </div>
    );
  }

  if (error && !currentWeather) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-400 via-red-500 to-red-600 flex items-center justify-center">
        <div className="text-white text-center max-w-md p-6">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <p className="text-xl mb-4 font-semibold">{error}</p>
            <p className="text-sm opacity-90">
              Please get your free API key from{' '}
              <a href="https://openweathermap.org/api" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-200 transition-colors">
                OpenWeather
              </a>{' '}
              and replace 'your-openweather-api-key' in the code.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const condition = currentWeather?.weather[0]?.main || 'default';
  const WeatherIcon = getWeatherIcon(condition);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getBackgroundGradient(condition)} transition-all duration-1000 relative overflow-hidden`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Search Bar */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && searchLocation(searchQuery)}
                placeholder="Search for a city..."
                className="w-full pl-10 pr-4 py-3 bg-white/20 backdrop-blur-md rounded-xl text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-200 shadow-lg"
              />
            </div>
            <button
              onClick={() => searchLocation(searchQuery)}
              className="px-6 py-3 bg-white/20 backdrop-blur-md rounded-xl text-white border border-white/30 hover:bg-white/30 hover:border-white/50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
            >
              Search
            </button>
            <button
              onClick={() => setShowMap(!showMap)}
              className="px-6 py-3 bg-white/20 backdrop-blur-md rounded-xl text-white border border-white/30 hover:bg-white/30 hover:border-white/50 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
            >
              <MapPin className="w-5 h-5" />
              {showMap ? 'Hide' : 'Show'} Map
            </button>
          </div>

          {/* Current Weather */}
          {currentWeather && (
            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              {/* Main Weather Card */}
              <div className="lg:col-span-2 bg-white/20 backdrop-blur-md rounded-3xl p-8 border border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:bg-white/25">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">{location.name}</h1>
                    <p className="text-white/80 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {Math.round(location.lat)}°, {Math.round(location.lon)}°
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-6xl font-light text-white mb-2 drop-shadow-lg">
                      {Math.round(currentWeather.main.temp)}°
                    </div>
                    <p className="text-white/80 capitalize font-medium">
                      {currentWeather.weather[0].description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-center mb-6">
                  <div className="relative">
                    <WeatherIcon className="w-24 h-24 text-white drop-shadow-lg animate-pulse" />
                    <div className="absolute inset-0 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse"></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-200">
                    <p className="text-white/70 text-sm mb-1">Feels like</p>
                    <p className="text-2xl font-semibold text-white">
                      {Math.round(currentWeather.main.feels_like)}°
                    </p>
                  </div>
                  <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-200">
                    <p className="text-white/70 text-sm mb-1">Humidity</p>
                    <p className="text-2xl font-semibold text-white">
                      {currentWeather.main.humidity}%
                    </p>
                  </div>
                </div>
              </div>

              {/* Weather Details */}
              <div className="space-y-4">
                <WeatherDetails weather={currentWeather} />
              </div>
            </div>
          )}

          {/* Map */}
          {showMap && (
            <div className="mb-8 animate-fade-in">
              <div className="bg-white/20 backdrop-blur-md rounded-3xl p-6 border border-white/30 shadow-2xl">
                <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">Weather Map</h2>
                <WeatherMap location={location} />
              </div>
            </div>
          )}

          {/* 5-Day Forecast */}
          {forecast.length > 0 && (
            <div className="bg-white/20 backdrop-blur-md rounded-3xl p-6 border border-white/30 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6 drop-shadow-lg">5-Day Forecast</h2>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {forecast.map((day, index) => (
                  <ForecastCard key={index} forecast={day} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
