import { useAuth } from "../store/auth-context";
import { NavLink, useNavigate } from "react-router";

const Header = () => {
  const { isLoggedIn, setIsUserLoggedIn } = useAuth();
  const navigate = useNavigate();
  return (
    <header className="header">
      <NavLink to={"/"}>Home</NavLink>
      <NavLink to={"/spots"}>Spots</NavLink>
      <NavLink to={"/new-spot"}>New Spot</NavLink>
      {!isLoggedIn ? (
        <button onClick={() => navigate("/login")}>Log In</button>
      ) : (
        <button
          onClick={() => {
            sessionStorage.removeItem("token");
            setIsUserLoggedIn(false);
          }}
        >
          Log Out
        </button>
      )}
    </header>
  );
};

export default Header;
