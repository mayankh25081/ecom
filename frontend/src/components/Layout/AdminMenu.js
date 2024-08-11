import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="text-center p-3">
        <div className="list-group">
        <h3 className="bg-dark p-2 text-white text-center">Admin pannel</h3>
          <NavLink
            to="/dashboard/admin/create-category"
            className="btn btn-danger mt-3"
          >
            Create category
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            className="btn btn-danger mt-2"
          >
            Create product
          </NavLink>
          <NavLink
            to="/dashboard/admin/Products"
            className="btn btn-danger mt-2"
          >
            Products
          </NavLink>
          <NavLink
            to="/dashboard/admin/orders"
            className="btn btn-danger mt-2"
          >
            Orders
          </NavLink>
          <NavLink
            to="/dashboard/admin/users"
            className="btn btn-danger mt-2"
          >
            Users
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
