import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../store/auth-context";
import { useState } from "react";
import { BASE_API } from "../api/config";

const Login = () => {
  const navigate = useNavigate();
  const { setIsUserLoggedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const loginUser = async (formData: any) => {
    const loginData = fetch(`${BASE_API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    return loginData
      .then(async (response) => {
        const body = await response.json();
        if (!response.ok) {
          throw new Error(body.message ?? "Something went wrong");
        }

        return body;
      })
      .then((data) => {
        if ("token" in data && data.token !== undefined) {
          sessionStorage.setItem("token", data.token);
          setIsUserLoggedIn(true);
          navigate("/");
          setIsLoading(false);
        }
        return data;
      })
      .catch((e) => console.error(e))
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <form
        onSubmit={async (event) => {
          setIsLoading(true);
          const data = new FormData(event.target);
          event.preventDefault();
          await loginUser(Object.fromEntries(data));
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
        <button disabled={isLoading} className="signup-button">
          Sign In
        </button>
      </form>
      <div>
        Don't have an account? <NavLink to={"/register"}>Sign Up</NavLink>
      </div>
    </div>
  );
};

export default Login;
