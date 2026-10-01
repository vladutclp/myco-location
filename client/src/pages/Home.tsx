import BenefitsList from "../components/BenefitsList";
import { useAuth } from "../store/auth-context";
import { Link } from "react-router";
import PhotoSheetLayout from "../components/PhotoSheetLayout/PhotoSheetLayout";
import Icon from "../components/Icon/Icon";
import buttonStyles from "../components/Button/Button.module.css";
import styles from "./Home.module.css";

const Home = () => {
  const { authStatus } = useAuth();
  console.log("isLoggedIn: ", authStatus);
  return authStatus === "authenticated" ? (
    <PhotoSheetLayout>
      <div className={styles.content}>
        <div className={styles.introduction}>
          <h1 className={styles.welcomeTitle}>Your field notebook</h1>
          <p className={styles.description}>
            Record a new find or revisit the places you have saved.
          </p>
        </div>
        <nav className={styles.notebookActions} aria-label="Field notebook">
          <Link
            to="/new-spot"
            className={`${buttonStyles.button} ${buttonStyles.primary}`}
          >
            <Icon name="plus" />
            Save a spot
          </Link>
          <Link
            to="/spots"
            className={`${buttonStyles.button} ${buttonStyles.secondary}`}
          >
            <Icon name="notebook" />
            Your spots
          </Link>
        </nav>
        <p className={styles.privacyNote}>
          Your saved spots are private to your account.
        </p>
      </div>
    </PhotoSheetLayout>
  ) : (
    <PhotoSheetLayout>
      <div className={styles.content}>
        <BenefitsList />
        <div className={styles.actions}>
          <Link
            to="/register"
            className={`${buttonStyles.button} ${buttonStyles.primary}`}
          >
            Create account
          </Link>
          <Link
            to="/login"
            className={`${buttonStyles.button} ${buttonStyles.secondary}`}
          >
            Sign In
          </Link>
        </div>
      </div>
    </PhotoSheetLayout>
  );
};

export default Home;
