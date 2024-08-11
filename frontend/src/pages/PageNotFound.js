import React from "react";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <Layout title={"404 - Page not found"}>
      <div className="pnf">
        <h1 className="pnf-title">404</h1>
        <h2 className="pnf-headding">Oops ! Page Not Found</h2>
        <Link to="/" className="pnf-btn">
          {" "}
          Go Back
        </Link>
      </div>
    </Layout>
  );
};

export default PageNotFound;
