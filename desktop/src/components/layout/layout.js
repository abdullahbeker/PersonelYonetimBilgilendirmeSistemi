import React from "react";
import { Sidebar, Footer, Header } from "../";
import { CContainer } from "@coreui/react";

const Layout = ({ children }) => {
  return (
    <div className="c-app c-default-layout">
      <Sidebar />
      <div className="c-wrapper">
        <Header />
        <div className="c-body">
          <main className="c-main">
            <CContainer fluid>{children}</CContainer>
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
