import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../store/auth-context";
import { useState } from "react";
import { BASE_API } from "../api/config";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import Label from "../components/Label/Label";
import FormGroup from "../components/FormGroup/FormGroup";
import AuthLayout from "../components/AuthLayout/AuthLayout";
import styles from "../components/AuthLayout/Auth.module.css";

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
    <AuthLayout>
      <form
        onSubmit={async (event) => {
          const data = new FormData(event.target);
          event.preventDefault();
          await loginUser(Object.fromEntries(data));
        }}
        className={styles.form}
      >
        <div>
          <h1 className={styles.formHeader}>Welcome Back</h1>
          <p className={styles.formSubheader}>YOUR FIELD NOTEBOOK</p>
        </div>
        <hr style={{ width: "100%" }} />
        <p>Sign in to revisit your saved spots</p>
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            placeholder="you@example.com"
            autoFocus
            required
            name="email"
            id="email"
            type="email"
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            placeholder="At least 6 characters"
            required
            name="password"
            id="password"
            type="password"
          />
        </FormGroup>
        {isError && (
          <span className="error-message">
            Something went wrong, please try again
          </span>
        )}
        <Button disabled={isLoading}>
          {isLoading ? "Loading..." : "Sign In"}
        </Button>
      </form>
      <div className={styles.formHint}>
        New to MycoLocation?{" "}
        <NavLink className={styles.formHintLink} to={"/register"}>
          Create an account
        </NavLink>
      </div>
    </AuthLayout>
  );
};

export default Login;
