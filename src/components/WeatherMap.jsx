
import React from 'react';
import { MapPin, Cloud } from 'lucide-react';

const WeatherMap = ({ location }) => {
  // This is a placeholder for the interactive map
  // In a real implementation, you would integrate with a mapping service like Mapbox or Google Maps
  return (
    <div className="relative h-64 bg-gradient-to-br from-blue-500/30 to-green-500/30 rounded-2xl overflow-hidden shadow-inner">
      {/* Map Placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-blue-800/30 to-green-800/20">
        <div className="flex items-center justify-center h-full">
          <div className="text-center text-white">
            <div className="relative mb-4">
              <Cloud className="w-16 h-16 mx-auto opacity-50 animate-pulse" />
              <div className="absolute inset-0 w-16 h-16 bg-white/10 rounded-full blur-xl animate-pulse mx-auto"></div>
            </div>
            <p className="text-lg font-semibold mb-2 drop-shadow-lg">Interactive Weather Map</p>
            <p className="text-sm opacity-75 font-medium">
              Map integration coming soon!
            </p>
            {location.name && (
              <div className="mt-4 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30 hover:bg-white/30 transition-all duration-200">
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-medium">{location.name}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Animated Weather Effects */}
      <div className="absolute top-4 left-4 w-3 h-3 bg-white/60 rounded-full animate-ping shadow-lg"></div>
      <div className="absolute top-8 right-8 w-2 h-2 bg-white/50 rounded-full animate-pulse shadow-lg"></div>
      <div className="absolute bottom-6 left-6 w-4 h-4 bg-white/40 rounded-full animate-bounce shadow-lg"></div>
      <div className="absolute bottom-12 right-12 w-2 h-2 bg-white/50 rounded-full animate-pulse delay-500 shadow-lg"></div>
      
      {/* Enhanced Location Marker */}
      {location.lat && location.lon && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <MapPin className="w-8 h-8 text-red-400 drop-shadow-lg animate-pulse" />
            <div className="absolute -top-1 -left-1 w-10 h-10 border-2 border-red-400/50 rounded-full animate-ping"></div>
            <div className="absolute -top-2 -left-2 w-12 h-12 border border-red-400/30 rounded-full animate-ping delay-500"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherMap;