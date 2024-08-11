import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/Auth";
import userDash from "../../images/userDash.avif";

const DashBoard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div
        className="container-fluid p-3"
        style={{
          height: "100vh",
          backgroundImage: `url(${userDash})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="row">
          <div className="col-lg-3 col-md-4">
            <UserMenu />
          </div>
          <div className="col-lg-9 col-md-8">
            <div
              className="col-md-6 m-5 p-5"
              style={{
                height: "70%",
                width: "70%",
                background: "#e67a7a",
                boxShadow: "8px 8px 8px rgba(230, 122, 122, 0.7)",
              }}
            >
              <h3 style={{ color: "black" }}>Hello {auth?.user?.name}</h3>
              <h4 style={{ color: "black" }}>
                Your Emial : {auth?.user?.email}
              </h4>
              <h4 style={{ color: "black" }}>
                Your Address : {auth?.user?.address}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashBoard;
