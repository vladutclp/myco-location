import { MapContainer, TileLayer } from "react-leaflet";
import MapLocation from "../components/MapLocation";

const NewSpot = () => {
  return (
    <div>
      <MapContainer
        style={{
          height: "360px",
          width: "400px",
        }}
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution={`&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`}
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapLocation />
      </MapContainer>
    </div>
  );
};

export default NewSpot;
