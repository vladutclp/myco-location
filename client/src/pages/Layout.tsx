import React from "react";
import Header from "../components/Header";
import { useAuth } from "../store/auth-context";

type Props = {
  children?: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const { isLoggedIn } = useAuth();
  return (
    <>
      <Header />
      <main className="main-content">{children}</main>
      {isLoggedIn && <footer className="footer">App footer</footer>}
    </>
  );
};

export default Layout;
