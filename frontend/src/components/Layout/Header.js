import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory.js";
import { useCart } from "../../context/Cart.js";
import { Badge } from "antd";
import Logo from '../Logo.js'

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const duration = 5000;

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("logout Successfully");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid mb-1 d-flex align-items-center">
          <Link to="/" className="navbar-brand me-3">
            <Logo />
          </Link>
          <div className="flex-grow-1 d-none d-md-block me-md-3">
            <SearchInput />
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-3">
              <li className="nav-item me-3">
                <NavLink
                  to="/"
                  className="nav-link"
                  aria-current="page"
                  activeClassName="active"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown me-3">
                <NavLink
                  to="/categories"
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                  activeClassName="active"
                  role="button"
                >
                  Categories
                </NavLink>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink
                      to={`/categories`}
                      className="dropdown-item"
                      activeClassName="active"
                    >
                      All Categories
                    </NavLink>
                  </li>
                  {categories?.map((c) => (
                    <li key={c._id}>
                      <NavLink
                        to={`/category/${c.slug}`}
                        className="dropdown-item"
                        activeClassName="active"
                      >
                        {c.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>
              {auth?.user ? (
                <li className="nav-item dropdown me-3">
                  <NavLink
                  to='/dashboard'
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                    activeClassName="active"
                    role="button"
                  >
                    {auth?.user?.name}
                  </NavLink>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink
                        to={`/dashboard/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                        className="dropdown-item"
                        activeClassName="active"
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={handleLogout}
                        to="/login"
                        className="dropdown-item"
                        activeClassName="active"
                      >
                        Logout
                      </NavLink>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                  </ul>
                </li>
              ) : (
                <>
                  <li className="nav-item me-3">
                    <NavLink
                      to="/register"
                      className="nav-link"
                      activeClassName="active"
                    >
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item me-3">
                    <NavLink
                      to="/login"
                      className="nav-link"
                      activeClassName="active"
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              )}
              <li className="nav-item">
                <Badge count={cart?.length} showZero>
                  <NavLink
                    to="/cart"
                    className="nav-link"
                    style={{ fontSize: "20px" }}
                    activeClassName="active"
                  >
                    🛒 CART
                  </NavLink>
                </Badge>
              </li>
            </ul>
          </div>
      <div className="d-md-none mt-3">
        <SearchInput />
      </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
