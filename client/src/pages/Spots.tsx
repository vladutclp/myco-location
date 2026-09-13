import { useEffect, useState } from "react";
import { useAuth } from "../store/auth-context";
import { NavLink } from "react-router";
import { MapContainer, TileLayer } from "react-leaflet";
import SpotMarkersList from "./SpotMarkersList";
import ToastMessage from "../components/ToastMessage";
import useToast from "../hooks/useToast";
import { deleteSpot, getAllSpots } from "../api/spots";

export interface Spots {
  id: number;
  latitude: number;
  longitude: number;
  observation?: string;
  title: string;
  userId: number;
}

const Spots = () => {
  const { isLoggedIn } = useAuth();
  const [spots, setSpots] = useState<Spots[]>([]);
  const {
    dismissToast,
    handleOnAnimationEnd,
    showToast,
    isToastExiting,
    isToastVisible,
  } = useToast();

  const handleDeleteSpot = async (spotId: number) => {
    dismissToast();
    try {
      await deleteSpot(spotId);
      showToast();
      setSpots((prevSpots) => prevSpots.filter((spot) => spot.id !== spotId));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const getSpots = async () => {
      try {
        const data = await getAllSpots();
        setSpots(data.spots);
      } catch (e) {
        console.error(e);
      }
    };
    getSpots();
  }, []);

  if (!isLoggedIn) {
    return (
      <div>
        Please <NavLink to="/login">Log In</NavLink>
      </div>
    );
  }
  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        flexDirection: "column",
      }}
    >
      {isToastVisible && (
        <ToastMessage
          onAnimationEnd={handleOnAnimationEnd}
          isToastExiting={isToastExiting}
        >
          Spot Deleted Successfully
        </ToastMessage>
      )}
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
        <SpotMarkersList spots={spots} />
      </MapContainer>

      <ul>
        {spots.map((spot) => (
          <li key={spot.id}>
            {spot.title}
            <button onClick={() => handleDeleteSpot(spot.id)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Spots;
