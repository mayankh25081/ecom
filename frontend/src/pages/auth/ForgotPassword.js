import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/Auth";
import Layout from "../../components/Layout/Layout";
import Logo from "../../components/Logo";
import Footer from "../../components/Layout/Footer";
import userDash from "../../images/userDash.avif";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `/api/v1/auth/forgot-password`,
        { email, newPassword, answer }
      );
      if (res && res.data.success) {
        navigate("/login");
        toast.success('Reset successfully');
      } else {
        toast.error("wrong email or Answer");
      }
    } catch (error) {
      console.log(error);
      toast.error("wrong email or answer");
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

<div className="d-flex justify-content-center">
        <Logo />
      </div>

      <div className="container mt-3">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card shadow-lg">
              <div className="card-body" style={{
                        height: "100%",
                        width: "100%",
                        background: "#e67a7a",
                        boxShadow: "8px 8px 8px rgba(230, 122, 122, 0.7)",
                      }}>
                <h2 className="card-title text-center mb-4">Reset Password</h2>
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
                    <label className="form-label">Your Favirate Sport</label>
                    <input
                      required
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Enter Your Favirate Sport Name"
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
                      New Password
                    </label>
                    <input
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Enter Your new Password"
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
                      <button type="submit" className="btn btn-dark mb-3">
                        Reset
                      </button>
                    </div>
                    <p
                      style={{
                        fontWeight: "100",
                      }}
                    >
                      New to Shopify
                    </p>
                    <Link to="/register" className="btn btn-outline-dark">
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
      <Footer />
      </div>
    </Layout>
  );
};

export default ForgotPassword;
