import { divIcon } from "leaflet";
import styles from "./MapMarker.module.css";

const createMarkerIcon = (variant: "draft" | "saved") =>
  divIcon({
    className: `${styles.marker} ${styles[variant]}`,
    html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 52" aria-hidden="true"><path d="M20 2C10 2 2 10 2 20c0 13 18 29 18 29s18-16 18-29C38 10 30 2 20 2Z" fill="currentColor" stroke="#fffdf7" stroke-width="3"/><circle cx="20" cy="20" r="6" fill="#fffdf7"/></svg>',
    iconSize: [40, 52],
    iconAnchor: [20, 50],
    popupAnchor: [0, -46],
  });

export const draftMarkerIcon = createMarkerIcon("draft");
export const savedMarkerIcon = createMarkerIcon("saved");
