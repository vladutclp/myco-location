import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../store/auth-context";
import { useState } from "react";
import { BASE_API } from "../api/config";
import type { Status } from "./Login";
import FormGroup from "../components/FormGroup/FormGroup";
import Label from "../components/Label/Label";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import PhotoSheetLayout from "../components/PhotoSheetLayout/PhotoSheetLayout";
import styles from "./AuthForm.module.css";

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
    <PhotoSheetLayout
      footer={
        <p className={styles.hint}>
          Already have an account?{" "}
          <NavLink className={styles.hintLink} to={"/login"}>
            Sign In
          </NavLink>
        </p>
      }
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
        className={styles.form}
      >
        <h1 className={styles.title}>Create your account</h1>
        <hr className={styles.divider} />
        <p className={styles.description}>Never miss a spot</p>
        <FormGroup>
          <Label htmlFor="email">E-mail</Label>
          <Input
            autoFocus
            required
            name="email"
            id="email"
            type="email"
            placeholder="you@email.com"
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
        <Button disabled={isLoading}>Create account</Button>
        {isError ? (
          <span className={styles.error}>Something went wrong</span>
        ) : null}
      </form>
    </PhotoSheetLayout>
  );
};

export default Register;
