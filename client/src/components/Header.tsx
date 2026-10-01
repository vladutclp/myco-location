import { useAuth } from "../store/auth-context";
import { NavLink } from "react-router";
import Button from "./Button/Button";
import buttonStyles from "./Button/Button.module.css";
import Icon from "./Icon/Icon";
import styles from "./Header.module.css";

const Header = () => {
  const { authStatus, setAuthenticationStatus } = useAuth();
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Icon name="leaf" />
          <span>Myco Location</span>
        </div>
        <nav className={styles.navigation} aria-label="Main navigation">
          {authStatus === "unauthenticated" ? (
            <NavLink
              className={`${buttonStyles.button} ${buttonStyles.primary}`}
              to={"/login"}
            >
              Log In
            </NavLink>
          ) : (
            <>
              <NavLink className={styles.link} to={"/"}>
                Home
              </NavLink>
              <NavLink className={styles.link} to={"/spots"}>
                Spots
              </NavLink>
              <NavLink className={styles.link} to={"/new-spot"}>
                New Spot
              </NavLink>
              <Button
                variant="quiet"
                className={styles.logout}
                onClick={() => {
                  sessionStorage.removeItem("token");
                  setAuthenticationStatus("unauthenticated");
                }}
              >
                Log Out
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
