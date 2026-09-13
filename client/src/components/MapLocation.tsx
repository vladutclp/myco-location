import { LatLng } from "leaflet";
import { Marker as LeafletMarker } from "leaflet";
import { useEffect, useState } from "react";
import { Marker, useMap } from "react-leaflet";

export type BasePoint = Pick<LatLng, "lat" | "lng">;

interface MapLocationProps {
  pinPosition?: Pick<LatLng, "lat" | "lng">;
  setUserLocation: React.Dispatch<React.SetStateAction<BasePoint | undefined>>;
  setPinPosition: React.Dispatch<React.SetStateAction<BasePoint | undefined>>;
}

const MapLocation = ({
  pinPosition,
  setUserLocation,
  setPinPosition,
}: MapLocationProps) => {
  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", (e) => {
      console.log(e.latlng);
      setPinPosition(e.latlng);
      setUserLocation(e.latlng);
      map.flyTo(e.latlng, map.getZoom(), { duration: 0.5, animate: true });
    });
  }, [map]);

  return (
    <>
      <Marker
        draggable
        eventHandlers={{
          dragend: (e) => {
            const marker = e.target;

            if (marker instanceof LeafletMarker) {
              console.log("user ended dragging at: ", marker.getLatLng());
              setPinPosition(marker.getLatLng());
            }
          },
        }}
        position={pinPosition || { lat: 0, lng: 0 }}
      ></Marker>
    </>
  );
};

export default MapLocation;
