import React from "react";

type Props = {
  children?: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <header className="header">App header</header>
      <main className="main-content">{children}</main>
      <footer className="footer">App footer</footer>
    </>
  );
};

export default Layout;
