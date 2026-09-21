import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../store/auth-context";
import { useState } from "react";
import { BASE_API } from "../api/config";

export type Status = "idle" | "loading" | "success" | "error";

const Login = () => {
  const navigate = useNavigate();
  const { setAuthenticationStatus } = useAuth();
  const [status, setStatus] = useState<Status>("idle");
  const isLoading = status === "loading";
  const isError = status === "error";
  const loginUser = async (formData: any) => {
    setStatus("loading");
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
          setAuthenticationStatus("authenticated");
          setStatus("success");
          navigate("/");
        } else {
          setStatus("error");
        }

        return data;
      })
      .catch((e) => {
        setStatus("error");
        console.error(e);
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
          await loginUser(Object.fromEntries(data));
        }}
        className="login-form"
      >
        <h1>Sign in into your account</h1>
        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input
            className="input input-error"
            autoFocus
            required
            name="email"
            id="email"
            type="email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input required name="password" id="password" type="password" />
        </div>
        {isError && (
          <span className="error-message">
            Something went wrong, please try again
          </span>
        )}
        <button
          disabled={isLoading}
          className={`button button--primary  ${isLoading ? "disabled" : ""}`}
        >
          {isLoading ? "Loading..." : "Log In"}
        </button>
      </form>
      <div>
        Don't have an account?{" "}
        <NavLink to={"/register"}>Create an account</NavLink>
      </div>
    </div>
  );
};

export default Login;
