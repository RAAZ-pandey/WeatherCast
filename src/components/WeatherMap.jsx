import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapPin, Cloud } from 'lucide-react';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const WeatherMap = ({ location }) => {
  if (!location.lat || !location.lon) {
    return (
      <div className="relative h-64 bg-gradient-to-br from-blue-500/30 to-green-500/30 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center">
        <p className="text-white">Loading map...</p>
      </div>
    );
  }

  return (
    <div className="relative h-64 rounded-2xl overflow-hidden shadow-inner">
      {/* Real interactive map */}
      <MapContainer
        center={[location.lat, location.lon]}
        zoom={10}
        scrollWheelZoom={false}
        className="w-full h-full z-0"
      >
        <TileLayer
            attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />

        <Marker position={[location.lat, location.lon]}>
          <Popup>
            {location.name ? location.name : 'Selected Location'}
          </Popup>
        </Marker>
      </MapContainer>


      {/* Additional animated dots for decoration */}
      <div className="absolute top-4 left-4 w-2 h-2 bg-white/60 rounded-full animate-ping shadow-lg"></div>
      <div className="absolute bottom-6 right-6 w-2 h-2 bg-white/50 rounded-full animate-pulse shadow-lg"></div>
    </div>
  );
};

export default WeatherMap;
