import { useEffect, useState } from "react";

function MapComponent({ location }) {
  const [mapError, setMapError] = useState(null);

  useEffect(() => {
    const loadGoogleMaps = async () => {
      try {
        if (!window.google) {
          const script = document.createElement("script");
          script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY`;
          script.async = true;
          script.defer = true;
          script.onerror = () => setMapError("Failed to load Google Maps");
          document.head.appendChild(script);

          script.onload = () => initializeMap();
        } else {
          initializeMap();
        }
      } catch (error) {
        setMapError(error.message);
      }
    };

    const initializeMap = () => {
      if (!window.google) {
        setMapError("Google Maps not loaded");
        return;
      }

      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: location.lat, lng: location.lng },
        zoom: 15,
      });

      new window.google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map,
      });
    };

    loadGoogleMaps();
  }, [location]);

  return (
    <div>
      {mapError ? <p style={{ color: "red" }}>{mapError}</p> : <div id="map" style={{ width: "100%", height: "300px" }}></div>}
    </div>
  );
}

export default MapComponent;
