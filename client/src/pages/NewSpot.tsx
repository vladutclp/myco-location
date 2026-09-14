import { MapContainer, TileLayer, useMap } from "react-leaflet";
import MapLocation, { type BasePoint } from "../components/MapLocation";
import { useState } from "react";
import ToastMessage from "../components/ToastMessage";
import { addNewSpot, type AddNewSpotPayload } from "../api/spots";
import useToast from "../hooks/useToast";

const ResetLocationButton = () => {
  const map = useMap();

  return (
    <div className={"leaflet-top leaflet-right"}>
      <div className="leaflet-control leaflet-bar">
        <button
          type="button"
          aria-label="Use my current location"
          onClick={() => map.locate()}
        >
          ⌖
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
    <form onSubmit={handleSaveSpot}>
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
        <MapLocation
          pinPosition={pinPosition}
          setPinPosition={setPinPosition}
          setUserLocation={setUserLocation}
        />
        <ResetLocationButton />
      </MapContainer>

      <div className="new-spots-input-wrapper">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <label htmlFor="spotName">Spot Name</label>
          <input
            className="input"
            required
            id="spotName"
            name="spotName"
            type="text"
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <label htmlFor="observation">Observation</label>
          <textarea rows={5} id="observation" name="observation" />
        </div>
        <button className="button button--primary">Save Spot</button>
        {isToastVisible && (
          <ToastMessage
            onAnimationEnd={handleOnAnimationEnd}
            isToastExiting={isToastExiting}
          >
            Spot created
          </ToastMessage>
        )}
      </div>
    </form>
  );
};

export default NewSpot;
