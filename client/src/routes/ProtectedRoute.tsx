import { useAuth } from "../store/auth-context";
import { Navigate, Outlet } from "react-router";
import styles from "../pages/RouteMessage.module.css";

const ProtectedRoute = () => {
  const { authStatus } = useAuth();
  console.log("isLogg ", authStatus);
  if (authStatus === "loading") {
    return <p className={styles.message}>Loading...</p>;
  }
  if (authStatus === "unauthenticated") {
    return <Navigate to={"/"} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
