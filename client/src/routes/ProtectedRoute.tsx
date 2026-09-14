import { useAuth } from "../store/auth-context";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const { authStatus } = useAuth();
  console.log("isLogg ", authStatus);
  if (authStatus === "loading") {
    return <p>Loading...</p>;
  }
  if (authStatus === "unauthenticated") {
    return <Navigate to={"/"} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
