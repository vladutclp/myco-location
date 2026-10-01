import { MapContainer, TileLayer, useMap } from "react-leaflet";
import MapLocation, { type BasePoint } from "../components/MapLocation";
import { useState } from "react";
import ToastMessage from "../components/ToastMessage";
import { addNewSpot, type AddNewSpotPayload } from "../api/spots";
import useToast from "../hooks/useToast";
import Button from "../components/Button/Button";
import FormGroup from "../components/FormGroup/FormGroup";
import Icon from "../components/Icon/Icon";
import Input from "../components/Input/Input";
import Label from "../components/Label/Label";
import MapSheetLayout from "../components/MapSheetLayout/MapSheetLayout";
import Textarea from "../components/Textarea/Textarea";
import mapStyles from "../components/MapSheetLayout/MapSheetLayout.module.css";
import styles from "./NewSpot.module.css";

const ResetLocationButton = () => {
  const map = useMap();

  return (
    <div className={"leaflet-top leaflet-right"}>
      <div className="leaflet-control leaflet-bar">
        <button
          className={styles.locateButton}
          type="button"
          aria-label="Use my current location"
          onClick={() => map.locate()}
        >
          <Icon name="locate" />
        </button>
      </div>
    </div>
  );
};

const NewSpot = () => {
  const [, setUserLocation] = useState<BasePoint>();
  const [pinPosition, setPinPosition] = useState<BasePoint>();
  const {
    showToast,
    handleOnAnimationEnd,
    dismissToast,
    isToastExiting,
    isToastVisible,
  } = useToast();
  const handleSaveSpot = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    dismissToast();
    const form = event.currentTarget;
    const data = new FormData(event.target);
    const payload: AddNewSpotPayload = {
      title: data.get("spotName") as string,
      observation: data.get("observation") as string,
      latitude: pinPosition?.lat!,
      longitude: pinPosition?.lng!,
    };
    try {
      await addNewSpot(payload);
      showToast();
      form.reset();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form className={styles.page} onSubmit={handleSaveSpot}>
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
            <MapLocation
              pinPosition={pinPosition}
              setPinPosition={setPinPosition}
              setUserLocation={setUserLocation}
            />
            <ResetLocationButton />
          </MapContainer>
        }
      >
        <div className={styles.content}>
          <header className={`${mapStyles.heading} ${styles.heading}`}>
            <p className={mapStyles.caption}>Field entry</p>
            <div className={mapStyles.titleRow}>
              <h1 className={mapStyles.title}>Save this spot</h1>
              <span className={styles.badge}>Draft pin</span>
            </div>
          </header>
          <div className={styles.coordinateStrip}>
            <Icon name="pin" className={styles.coordinateIcon} />
            <div className={styles.coordinateText}>
              <p className={styles.coordinates}>
                {pinPosition?.lat.toFixed(4) ?? "—"},{" "}
                {pinPosition?.lng.toFixed(4) ?? "—"}
              </p>
              <p className={styles.coordinateHint}>Move the pin to adjust</p>
            </div>
          </div>
          <FormGroup>
            <Label htmlFor="spotName">Spot name</Label>
            <Input required id="spotName" name="spotName" type="text" />
          </FormGroup>
          <FormGroup>
            <div className={styles.labelRow}>
              <Label htmlFor="observation">Observation</Label>
              <span className={styles.optional}>Optional</span>
            </div>
            <Textarea rows={5} id="observation" name="observation" />
          </FormGroup>
          <p className={styles.privacyNote}>Only you can see saved spots.</p>
          <Button type="submit" className={styles.saveButton}>
            <Icon name="plus" />
            Save spot
          </Button>
          {isToastVisible && (
            <ToastMessage
              onAnimationEnd={handleOnAnimationEnd}
              isToastExiting={isToastExiting}
            >
              Spot created
            </ToastMessage>
          )}
        </div>
      </MapSheetLayout>
    </form>
  );
};

export default NewSpot;
