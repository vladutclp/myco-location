import { useEffect, useState } from "react";
import { useAuth } from "../store/auth-context";
import { NavLink } from "react-router";
import { MapContainer, TileLayer } from "react-leaflet";
import SpotMarkersList from "./SpotMarkersList";
import ToastMessage from "../components/ToastMessage";
import useToast from "../hooks/useToast";
import { deleteSpot, getAllSpots } from "../api/spots";
import Button from "../components/Button/Button";
import Icon from "../components/Icon/Icon";
import MapSheetLayout from "../components/MapSheetLayout/MapSheetLayout";
import mapStyles from "../components/MapSheetLayout/MapSheetLayout.module.css";
import buttonStyles from "../components/Button/Button.module.css";
import styles from "./Spots.module.css";

export interface Spots {
  id: number;
  latitude: number;
  longitude: number;
  observation?: string;
  title: string;
  userId: number;
}

const Spots = () => {
  const { authStatus } = useAuth();
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

  if (authStatus === "unauthenticated") {
    return (
      <div className={styles.signInPrompt}>
        Please <NavLink to="/login">Log In</NavLink>
      </div>
    );
  }
  return (
    <div className={styles.page}>
      {isToastVisible && (
        <ToastMessage
          onAnimationEnd={handleOnAnimationEnd}
          isToastExiting={isToastExiting}
        >
          Spot Deleted Successfully
        </ToastMessage>
      )}
      <MapSheetLayout
        map={
          <MapContainer
            className={mapStyles.map}
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
        }
      >
        <header className={`${mapStyles.heading} ${styles.heading}`}>
          <p className={mapStyles.caption}>Private field notebook</p>
          <div className={mapStyles.titleRow}>
            <h1 className={mapStyles.title}>Your spots</h1>
            <span className={styles.count}>{spots.length} saved</span>
          </div>
        </header>
        <ul className={styles.list}>
          {spots.map((spot) => (
            <li className={styles.spot} key={spot.id}>
              <h2 className={styles.spotTitle}>{spot.title}</h2>
              {spot.observation && (
                <p className={styles.observation}>{spot.observation}</p>
              )}
              <p className={styles.coordinates}>
                <Icon name="pin" />
                <span>
                  {spot.latitude.toFixed(4)}, {spot.longitude.toFixed(4)}
                </span>
              </p>
              <Button
                type="button"
                variant="destructive"
                className={styles.deleteButton}
                onClick={() => handleDeleteSpot(spot.id)}
              >
                <Icon name="trash" />
                Delete spot
              </Button>
            </li>
          ))}
        </ul>
        <NavLink
          className={`${buttonStyles.button} ${buttonStyles.primary} ${styles.saveLink}`}
          to="/new-spot"
        >
          <Icon name="plus" />
          Save a spot
        </NavLink>
      </MapSheetLayout>
    </div>
  );
};

export default Spots;
