import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../store/auth-context";
import { useState } from "react";
import { BASE_API } from "../api/config";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import Label from "../components/Label/Label";
import FormGroup from "../components/FormGroup/FormGroup";
import PhotoSheetLayout from "../components/PhotoSheetLayout/PhotoSheetLayout";
import styles from "./AuthForm.module.css";

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
    <PhotoSheetLayout
      footer={
        <p className={styles.hint}>
          New to MycoLocation?{" "}
          <NavLink className={styles.hintLink} to={"/register"}>
            Create an account
          </NavLink>
        </p>
      }
    >
      <form
        onSubmit={async (event) => {
          const data = new FormData(event.target);
          event.preventDefault();
          await loginUser(Object.fromEntries(data));
        }}
        className={styles.form}
      >
        <div className={styles.header}>
          <h1 className={styles.title}>Welcome Back</h1>
          <p className={styles.caption}>YOUR FIELD NOTEBOOK</p>
        </div>
        <hr className={styles.divider} />
        <p className={styles.description}>Sign in to revisit your saved spots</p>
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
          <span className={styles.error}>
            Something went wrong, please try again
          </span>
        )}
        <Button disabled={isLoading}>
          {isLoading ? "Loading..." : "Sign In"}
        </Button>
      </form>
    </PhotoSheetLayout>
  );
};

export default Login;
