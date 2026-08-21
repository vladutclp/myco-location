import { LatLng } from "leaflet";
import { useEffect, useState } from "react";
import { Marker, useMap } from "react-leaflet";

const MapLocation = () => {
  const map = useMap();
  const [position, setPosition] = useState<LatLng>();
  const [userLocation, setUserLocation] = useState<LatLng>();

  useEffect(() => {
    map.locate().on("locationfound", (e) => {
      console.log(e.latlng);
      setPosition(e.latlng);
      setUserLocation(e.latlng);
      map.flyTo(e.latlng, map.getZoom(), { duration: 0.5, animate: true });
    });
  }, [map]);

  return (
    <Marker
      draggable
      eventHandlers={{
        move: (e) => {
          console.log("moving the mark: ", e);
        },
      }}
      position={position || { lat: 0, lng: 0 }}
    ></Marker>
  );
};

export default MapLocation;
