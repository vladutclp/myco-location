import { createContext, useContext, useState } from "react";

export interface AuthContextInterface {
  authStatus: AuthStatus;
  setAuthenticationStatus: (authStatus: AuthStatus) => void;
}

type Props = {
  children?: React.ReactNode;
};

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

export const AuthContext = createContext<AuthContextInterface | null>(null);
const AuthProvider = ({ children }: Props) => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>("loading");

  const setAuthenticationStatus = (authStatus: AuthStatus) =>
    setAuthStatus(authStatus);

  return (
    <AuthContext.Provider value={{ authStatus, setAuthenticationStatus }}>
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
