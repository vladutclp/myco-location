import type { ReactNode } from "react";
import PaperPanel from "../PaperPanel/PaperPanel";
import styles from "./MapSheetLayout.module.css";

interface Props {
  map: ReactNode;
  children: ReactNode;
}

const MapSheetLayout = ({ map, children }: Props) => (
  <div className={styles.layout} data-map-sheet>
    <div className={styles.mapRegion}>{map}</div>
    <PaperPanel className={styles.panel}>{children}</PaperPanel>
  </div>
);

export default MapSheetLayout;
