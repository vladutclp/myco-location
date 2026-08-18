import React from "react";
import { useAuth } from "../store/auth-context";
import { NavLink } from "react-router";

const Spots = () => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return (
      <div>
        Please <NavLink to="/login">Log In</NavLink>
      </div>
    );
  }
  return <div>Spots</div>;
};

export default Spots;
