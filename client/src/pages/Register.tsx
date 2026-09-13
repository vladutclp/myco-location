import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../store/auth-context";
import { useState } from "react";
import { BASE_API } from "../api/config";

const Register = () => {
  const { setIsUserLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const registerUser = async (formData: any) => {
    return fetch(`${BASE_API}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  };
  console.log("isError: ", isError);
  console.log("typeof isError: ", typeof isError);
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <form
        onSubmit={async (event) => {
          setIsLoading(true);
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
                setIsUserLoggedIn(true);
                setIsLoading(false);
                navigate("/");
              }
            })
            .catch((error) => {
              console.log(error);
              setIsLoading(false);
              setIsError(error);
            })
            .finally(() => {
              setIsLoading(false);
            });
        }}
        className="login-form"
      >
        <h1>Create your account</h1>
        <div className="field-wrapper">
          <label htmlFor="email">E-mail</label>
          <input required name="email" id="email" type="email" />
        </div>
        <div className="field-wrapper">
          <label htmlFor="password">Password</label>
          <input required name="password" id="password" type="password" />
        </div>
        <button disabled={isLoading} className="button button--primary">
          Sign Up
        </button>
        {isError ? <span>Something went wrong</span> : null}
      </form>
      <div>
        Already have an account? <NavLink to={"/login"}>Sign In</NavLink>
      </div>
    </div>
  );
};

export default Register;
