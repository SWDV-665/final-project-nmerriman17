import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

interface MarkerData {
  location: string;
  date: string;
}

const MyTrips: React.FC = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [currentMarker, setCurrentMarker] = useState<MarkerData | null>(null);
  const [showPrompt, setShowPrompt] = useState<boolean>(false);

  useEffect(() => {
    initMap();
    setShowPrompt(true);
    fetchMarkers(); // Fetch markers from the backend
  }, []);

  function initMap() {
    const aspen = new window.google.maps.LatLng(39.1911, -106.8175);
    const map = new window.google.maps.Map(document.getElementById('map') as HTMLElement, {
      zoom: 6,
      center: aspen,
    });

    setMap(map);

    map.addListener('click', (event: google.maps.MouseEvent) => {
      if (event.latLng) {
        addMarker(event.latLng, map);
      }
    });
  }

  async function addMarker(location: google.maps.LatLng, map: google.maps.Map) {
    const marker = new window.google.maps.Marker({
      position: location,
      map,
      title: 'New Marker',
    });

    marker.addListener('click', () => {
      openMarkerForm(marker);
    });

    marker.addListener('dblclick', () => {
      deleteMarker(marker);
    });

    const markerData = { location: '', date: '', latitude: location.lat(), longitude: location.lng() };

    // Send the marker data to the backend
    await axios.post('/api/markers', markerData);

    setMarkers((prevMarkers) => [
      ...prevMarkers,
      { ...markerData },
    ]);
  }

  async function fetchMarkers() {
    const response = await axios.get('/api/markers');
    setMarkers(response.data);
  }

  function deleteMarker(marker: google.maps.Marker) {
    const confirmed = window.confirm('Are you sure you want to delete this marker?');
    if (confirmed) {
      marker.setMap(null);
      setMarkers((prevMarkers) => prevMarkers.filter((m) => m !== currentMarker));
      setCurrentMarker(null);
    }
  }

  function openMarkerForm(marker: google.maps.Marker) {
    const markerData = markers.find((m) => m === currentMarker);
    if (markerData) {
      setCurrentMarker(markerData);
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pinned Trips</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div id="map" className="map-container" style={{ height: '100%' }}>
          {showPrompt && (
            <div className="popup">
              <p>Click to add a pin and double click for the option to delete.</p>
              <button onClick={() => setShowPrompt(false)}>OK</button>
            </div>
          )}

          {currentMarker && (
            <div className="info-window">
              <h2>Marker Details</h2>
              <input
                type="text"
                placeholder="Location"
                value={currentMarker.location}
                onChange={(e) =>
                  setCurrentMarker({ ...currentMarker, location: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Date"
                value={currentMarker.date}
                onChange={(e) =>
                  setCurrentMarker({ ...currentMarker, date: e.target.value })
                }
              />
              <button onClick={() => setCurrentMarker(null)}>Close</button>
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MyTrips;
