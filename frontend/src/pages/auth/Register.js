import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../../components/Layout/Layout";
import userDash from "../../images/userDash.avif";
import Logo from "../../components/Logo";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `/api/v1/auth/register`,
        { name, email, password, phone, address, answer }
      );
      if (res && res.data.success) {
        toast.success("Registered successfully");
        navigate("/login");
      } else {
        toast.error(`${res.data.message}`);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
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
                <h2 className="card-title text-center mb-4">Register</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="exampleInputName" className="form-label">
                      Name
                    </label>
                    <input
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      className="form-control"
                      id="exampleInputName"
                      placeholder="Enter Your Name"
                      style={{
                        border: "0.5px solid black",
                      }}
                    />
                  </div>
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
                  <div className="mb-3">
                    <label htmlFor="exampleInputPhone" className="form-label">
                      Phone
                    </label>
                    <input
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      type="text"
                      className="form-control"
                      id="exampleInputPhone"
                      placeholder="Enter Your Phone"
                      style={{
                        border: "0.5px solid black",
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputAddress" className="form-label">
                      Address
                    </label>
                    <input
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      type="text"
                      className="form-control"
                      id="exampleInputAddress"
                      placeholder="Enter Your Address"
                      style={{
                        border: "0.5px solid black",
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputAddress" className="form-label">
                      Favorite Sport
                    </label>
                    <input
                      required
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      type="text"
                      className="form-control"
                      id="exampleInputAddress"
                      placeholder="What is Your Favorite Sport"
                      style={{
                        border: "0.5px solid black",
                      }}
                    />
                  </div>
                  <div className="text-center mt-3">
                    <button type="submit" className="btn btn-danger mb-3">
                      Register
                    </button>
                    <p>Already have an Account</p>
                    <Link to="/login" className="btn btn-outline-danger">
                      Login
                    </Link>
                  </div>
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

export default Register;
