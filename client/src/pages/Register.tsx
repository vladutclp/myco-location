import React from "react";
import { NavLink } from "react-router";

const Register = () => {
  console.log("component rendering");
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <form
        onSubmit={(event) => {
          const data = new FormData(event.target);
          event.preventDefault();
          //Register user logic
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
        <button className="signup-button">Sign Up</button>
      </form>
      <div>
        Already have an account? <NavLink to={"/login"}>Sign In</NavLink>
      </div>
    </div>
  );
};

export default Register;
