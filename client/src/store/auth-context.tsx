import { createContext, useContext, useState } from "react";

export interface AuthContextInterface {
  isLoggedIn: boolean;
  setIsUserLoggedIn: (isUserLoggedIn: boolean) => void;
}

type Props = {
  children?: React.ReactNode;
};

export const AuthContext = createContext<AuthContextInterface | null>(null);
const AuthProvider = ({ children }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const setIsUserLoggedIn = (isUserLoggedIn: boolean) =>
    setIsLoggedIn(isUserLoggedIn);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsUserLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextInterface => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};

export default AuthProvider;
