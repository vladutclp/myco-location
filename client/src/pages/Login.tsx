import React from "react";
import { Link, NavLink } from "react-router";

const Login = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <form
        onSubmit={(event) => {
          const data = new FormData(event.target);
          event.preventDefault();
          //Login user logic
          console.log("data", Object.fromEntries(data.entries()));
          event.currentTarget.reset();
        }}
        className="login-form"
      >
        <div className="field-wrapper">
          <label htmlFor="email">E-mail</label>
          <input required name="email" id="email" type="email" />
        </div>
        <div className="field-wrapper">
          <label htmlFor="password">Password</label>
          <input required name="password" id="password" type="password" />
        </div>
        <button className="signup-button">Sign In</button>
      </form>
      <div>
        Don't have an account? <NavLink to={"/register"}>Sign Up</NavLink>
      </div>
    </div>
  );
};

export default Login;
