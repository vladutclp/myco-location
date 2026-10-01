import { useEffect } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import type { Spots } from "./Spots";
import { savedMarkerIcon } from "../components/MapMarker/markerIcons";

interface Props {
  spots: Spots[];
}

const SpotMarkersList = ({ spots }: Props) => {
  const map = useMap();
  useEffect(() => {
    map.locate().on("locationfound", (e) => {
      map.flyTo(e.latlng, map.getZoom(), { duration: 0.5, animate: true });
    });
  }, [map]);
  return (
    <div>
      {spots.map((spot) => {
        return (
          <Marker
            icon={savedMarkerIcon}
            key={spot.id}
            position={{ lat: spot.latitude, lng: spot.longitude }}
          >
            <Popup>{spot.title}</Popup>
          </Marker>
        );
      })}
    </div>
  );
};

export default SpotMarkersList;
