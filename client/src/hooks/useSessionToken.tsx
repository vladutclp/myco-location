import { useEffect } from "react";
import { useAuth } from "../store/auth-context";

const useSessionToken = () => {
  const { setAuthenticationStatus } = useAuth();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setAuthenticationStatus("authenticated");
    } else {
      setAuthenticationStatus("unauthenticated");
    }
  }, []);
};

export default useSessionToken;
