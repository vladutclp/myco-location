import { NavLink } from "react-router";

export const BASE_API = "http://localhost:8080/api";

const Register = () => {
  const registerUser = async (formData: any) => {
    fetch(`${BASE_API}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <form
        onSubmit={async (event) => {
          const data = new FormData(event.target);
          event.preventDefault();
          await registerUser(Object.fromEntries(data));
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
