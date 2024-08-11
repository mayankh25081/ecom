import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/Auth";
import Layout from "../../components/Layout/Layout";
import Logo from "../../components/Logo";
import Footer from "../../components/Layout/Footer";
import userDash from "../../images/userDash.avif";

const Login = () => {
  // const { REACT_APP_API } = process.env;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const location = useLocation();
  const duration = 200000;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 
      const res = await axios.post(`/api/v1/auth/login`, {
        email,
        password,
      });
      if (res && res.data.success) {
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        toast.success('Login successful');
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Wrong password or Email is not regiatered");
    }
  };

  return (
    <Layout>
      <div style={{
          backgroundImage: `url(${userDash})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}>
      {/* <h1 className="text-center mb-3">SHOPIFY</h1> */}
      <div className="d-flex justify-content-center">
        <Logo />
      </div>

      <div className="container mt-3">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card shadow-lg mb-3">
              <div className="card-body"style={{
                        height: "100%",
                        width: "100%",
                        background: "#e67a7a",
                        boxShadow: "8px 8px 8px rgba(230, 122, 122, 0.7)",
                      }}>
                <h2 className="card-title text-center mb-4">Login</h2>
                <form style={{ marginTop: "40px" }} onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Email address
                    </label>
                    <input
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Enter Your Email"
                      style={{
                        border: "0.5px solid black",
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
                      Password
                    </label>
                    <input
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Enter Your Password"
                      style={{
                        border: "0.5px solid black",
                      }}
                    />
                  </div>
                  <div
                    className=""
                    style={{
                      height: "140px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        // alignItems: 'center',
                        justifyContent: "space-between",
                      }}
                    >
                      <button type="submit" className="btn btn-danger mb-3">
                        Login
                      </button>
                      <a
                        type="button"
                        className="btn-outline-danger mb-3"
                        onClick={() => {
                          navigate("/forgot-password");
                        }}
                      >
                        Forgot Password
                      </a>
                    </div>
                    <p
                      style={{
                        fontWeight: "100",
                      }}
                    >
                      New to Shopify
                    </p>
                    <Link to="/register" className="btn btn-outline-danger">
                      Register
                    </Link>
                  </div>
                  <div style={{ height: "25px" }}></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

    </Layout>
  );
};

export default Login;
