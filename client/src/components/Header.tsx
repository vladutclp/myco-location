import { useAuth } from "../store/auth-context";
import { NavLink } from "react-router";

const Header = () => {
  const { isLoggedIn, setIsUserLoggedIn } = useAuth();
  return (
    <header className="header">
      {!isLoggedIn ? (
        <NavLink className={"button button--primary"} to={"/login"}>
          Log In
        </NavLink>
      ) : (
        <>
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to={"/spots"}>Spots</NavLink>
          <NavLink to={"/new-spot"}>New Spot</NavLink>
          <button
            onClick={() => {
              sessionStorage.removeItem("token");
              setIsUserLoggedIn(false);
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
