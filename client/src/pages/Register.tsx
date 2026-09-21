import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../store/auth-context";
import { useState } from "react";
import { BASE_API } from "../api/config";
import type { Status } from "./Login";

const Register = () => {
  const { setAuthenticationStatus } = useAuth();
  const navigate = useNavigate();
  const [status, setStatus] = useState<Status>("idle");
  const isLoading = status === "loading";
  const isError = status === "error";

  const registerUser = async (formData: any) => {
    setStatus("loading");
    return fetch(`${BASE_API}/auth/register`, {
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
          registerUser(Object.fromEntries(data))
            .then(async (response) => {
              const body = await response.json();
              if (!response.ok) {
                throw new Error(body.message ?? "Registration failed");
              }
              return body;
            })
            .then((data) => {
              console.log("parsed data: ", data);
              if ("token" in data && data.token !== undefined) {
                sessionStorage.setItem("token", data.token);
                setAuthenticationStatus("authenticated");
                setStatus("loading");
                navigate("/");
              } else {
                setStatus("error");
              }
            })
            .catch((error) => {
              console.log(error);
              setStatus("error");
            });
        }}
        className="login-form"
      >
        <h1>Create your account</h1>
        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input autoFocus required name="email" id="email" type="email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input required name="password" id="password" type="password" />
          <span className="password-requirements">
            Your password must be at least 6 characters
          </span>
        </div>
        <button
          disabled={isLoading}
          className={`button button--primary  ${isLoading ? "disabled" : ""}`}
        >
          Create account
        </button>
        {isError ? (
          <span className="error-message">Something went wrong</span>
        ) : null}
      </form>
      <div>
        Already have an account? <NavLink to={"/login"}>Sign In</NavLink>
      </div>
    </div>
  );
};

export default Register;
