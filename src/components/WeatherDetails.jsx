import React from 'react';
import { Wind, Eye, Droplets, Thermometer, Navigation, Gauge } from 'lucide-react';

const WeatherDetails = ({ weather }) => {
  const details = [
    {
      icon: Wind,
      label: 'Wind Speed',
      value: `${weather.wind.speed} m/s`,
      color: 'text-blue-200',
      bgColor: 'bg-blue-500/20'
    },
    {
      icon: Eye,
      label: 'Visibility',
      value: `${(weather.visibility / 1000).toFixed(1)} km`,
      color: 'text-green-200',
      bgColor: 'bg-green-500/20'
    },
    {
      icon: Gauge,
      label: 'Pressure',
      value: `${weather.main.pressure} hPa`,
      color: 'text-purple-200',
      bgColor: 'bg-purple-500/20'
    },
    {
      icon: Navigation,
      label: 'Wind Direction',
      value: `${weather.wind.deg}°`,
      color: 'text-yellow-200',
      bgColor: 'bg-yellow-500/20'
    }
  ];

  return (
    <>
      {details.map((detail, index) => {
        const IconComponent = detail.icon;
        return (
          <div
            key={index}
            className={`bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${detail.bgColor}`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${detail.bgColor} backdrop-blur-sm`}>
                <IconComponent className={`w-5 h-5 ${detail.color}`} />
              </div>
              <div>
                <p className="text-white/70 text-sm font-medium">{detail.label}</p>
                <p className="text-white font-semibold text-lg">{detail.value}</p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default WeatherDetails;