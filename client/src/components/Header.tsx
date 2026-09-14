import { useAuth } from "../store/auth-context";
import { NavLink } from "react-router";

const Header = () => {
  const { authStatus, setAuthenticationStatus } = useAuth();
  return (
    <header className="header">
      {authStatus === "unauthenticated" ? (
        <NavLink className={"button button--primary"} to={"/login"}>
          Log In
        </NavLink>
      ) : (
        <>
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to={"/spots"}>Spots</NavLink>
          <NavLink to={"/new-spot"}>New Spot</NavLink>
          <button
            className="button"
            onClick={() => {
              sessionStorage.removeItem("token");
              setAuthenticationStatus("unauthenticated");
            }}
          >
            Log Out
          </button>
        </>
      )}
    </header>
  );
};

export default Header;
