import BenefitsList from "../components/BenefitsList";
import { useAuth } from "../store/auth-context";
import { Link } from "react-router";
import AuthLayout from "../components/AuthLayout/AuthLayout";
import styles from "../components/AuthLayout/Auth.module.css";

const Home = () => {
  const { authStatus } = useAuth();
  console.log("isLoggedIn: ", authStatus);
  return authStatus === "authenticated" ? (
    <div style={{ color: "#1b6e4b" }}>
      <h1>Welcome to MycoLocation</h1>
    </div>
  ) : (
    <AuthLayout>
      <div className={styles.form}>
        <BenefitsList />
        <Link to="/register" className="button button--primary">
          Create account
        </Link>
        <Link to="/login" className="button">
          Sign In
        </Link>
      </div>
    </AuthLayout>
  );
};

export default Home;
