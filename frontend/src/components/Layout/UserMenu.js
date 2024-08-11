import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <>
      <div className="text-center p-3">
        <div className="list-group">
        <h1 className="bg-dark p-2 text-white text-center">Dashboard</h1>
          <NavLink
            to="/dashboard/user"
            className="btn btn-danger mt-3"
          >
            Profile
          </NavLink>
          <NavLink
            to="/dashboard/user/profile"
            className="btn btn-danger mt-2"
          >
            Mannage Profile
          </NavLink>
          <NavLink
            to="/dashboard/user/orders"
            className="btn btn-danger mt-2"
          >
            My Orders
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default UserMenu;
