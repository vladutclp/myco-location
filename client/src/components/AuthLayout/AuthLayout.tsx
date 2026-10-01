import { type ReactNode } from "react";
import styles from "./Auth.module.css";

interface Props {
  children: ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return (
    <div className={styles.sheet}>
      <div className={styles.hero}>
        <div className={styles.heroTextWrapper}>
          <p className={styles.heroCaption}>PRIVATE BY DEFAULT</p>
          <p className={styles.heroHeading}>
            Keep the places you want to return to
          </p>
        </div>
      </div>
      {children}
    </div>
  );
};

export default AuthLayout;
