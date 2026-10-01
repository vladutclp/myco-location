import type { ReactNode } from "react";
import PaperPanel from "../PaperPanel/PaperPanel";
import styles from "./PhotoSheetLayout.module.css";

interface Props {
  children: ReactNode;
  footer?: ReactNode;
}

const PhotoSheetLayout = ({ children, footer }: Props) => (
  <div className={styles.sheet}>
    <div className={styles.hero}>
      <div className={styles.heroText}>
        <p className={styles.caption}>PRIVATE BY DEFAULT</p>
        <p className={styles.heading}>
          Keep the places you want to return to
        </p>
      </div>
    </div>
    <PaperPanel className={styles.panel}>
      {children}
      {footer && <div className={styles.footer}>{footer}</div>}
    </PaperPanel>
  </div>
);

export default PhotoSheetLayout;
