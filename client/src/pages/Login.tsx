import { NavLink, useNavigate } from "react-router";
import { BASE_API } from "./Register";
import { useAuth } from "../store/auth-context";

const Login = () => {
  const navigate = useNavigate();
  const { setIsUserLoggedIn } = useAuth();

  const loginUser = async (formData: any) => {
    const loginData = fetch(`${BASE_API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    return loginData
      .then((data) => data.json())
      .then((data) => {
        if ("token" in data && data.token !== undefined) {
          sessionStorage.setItem("token", data.token);
          setIsUserLoggedIn(true);
          navigate("/");
        }
        return data;
      })
      .catch((e) => console.error(e));
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <form
        onSubmit={async (event) => {
          const data = new FormData(event.target);
          event.preventDefault();
          const loginData = await loginUser(Object.fromEntries(data));
          console.log("loginData: ", loginData);
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
