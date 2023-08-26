import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 37.7749,
  lng: -122.4194
};

const MapView = ({ favoriteLocations, onMarkerClick }) => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyCXoVL8Ciwpj7CaeIqpasCKuc1wVdCyv4U">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {favoriteLocations.map((location, index) => (
          <Marker
            key={index}
            position={{ lat: location.lat, lng: location.lng }}
            onClick={() => onMarkerClick(index)}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapView;
