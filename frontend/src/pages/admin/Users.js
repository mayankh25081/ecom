import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";

const Users = () => {
  return (
    <Layout title={"Dashboard - All Users"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-4 col-lg-3">
            <AdminMenu />
          </div>
          <div className="col-md-8 col-lg-9">
            <h1>All users</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
