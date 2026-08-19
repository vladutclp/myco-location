import { useEffect } from "react";
import { useAuth } from "../store/auth-context";

const useSessionToken = () => {
  const { setIsUserLoggedIn } = useAuth();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }
  }, []);
};

export default useSessionToken;
