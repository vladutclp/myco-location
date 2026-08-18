import React from "react";
import Header from "../components/Header";

type Props = {
  children?: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main className="main-content">{children}</main>
      <footer className="footer">App footer</footer>
    </>
  );
};

export default Layout;
