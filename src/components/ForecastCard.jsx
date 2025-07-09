import React from 'react';
import { Sun, Cloud, CloudRain, Snowflake } from 'lucide-react';

const ForecastCard = ({ forecast }) => {
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const WeatherIcon = getWeatherIcon(forecast.weather[0].main);

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 text-center group hover:shadow-lg transform hover:scale-105">
      <p className="text-white/80 text-sm mb-3 font-medium">
        {formatDate(forecast.dt_txt)}
      </p>
      
      <div className="flex justify-center mb-4">
        <div className="relative">
          <WeatherIcon className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-200" />
          <div className="absolute inset-0 w-8 h-8 bg-white/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
        </div>
      </div>
      
      <div className="space-y-2">
        <p className="text-xl font-bold text-white drop-shadow-sm">
          {Math.round(forecast.main.temp_max)}°
        </p>
        <p className="text-white/70 text-sm font-medium">
          {Math.round(forecast.main.temp_min)}°
        </p>
      </div>
      
      <p className="text-white/60 text-xs mt-3 capitalize font-medium">
        {forecast.weather[0].description}
      </p>
    </div>
  );
};

export default ForecastCard;
