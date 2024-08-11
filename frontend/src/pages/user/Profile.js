import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/Auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import userDash from "../../images/userDash.avif";

const Profile = () => {
  const [auth, setAuth] = useAuth("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const { name, phone, email, address } = auth?.user;
    setName(name);
    setAddress(address);
    setEmail(email);
    setPhone(phone);
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/auth/profile`,
        { name, email, password, phone, address }
      );
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data?.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success(data?.message);
        navigate(`/dashboard/user`);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", { duration: 5000 });
    }
  };
  return (
    <Layout title={"Dashboard - Profile"}>
      <div
        className="container-fluid p-3"
        style={{
          backgroundImage: `url(${userDash})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="row">
          <div className="col-md-4 col-lg-3">
            <UserMenu />
          </div>
          <div className="col-md-8 col-lg-9">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6 col-sm-10">
                  <div className="card shadow-lg">
                    <div
                      className="card-body"
                      style={{
                        height: "100%",
                        width: "100%",
                        background: "#e67a7a",
                        boxShadow: "8px 8px 8px rgba(230, 122, 122, 0.7)",
                      }}
                    >
                      <h4 className="card-title text-center mb-4">
                        User Profile
                      </h4>
                      <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <label
                            htmlFor="exampleInputName"
                            className="form-label"
                          >
                            Name
                          </label>
                          <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            className="form-control"
                            id="exampleInputName"
                            placeholder="Enter Your Name"
                            style={{
                              borderBottom: "0.5px solid black",
                            }}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="exampleInputEmail1"
                            className="form-label"
                          >
                            Email address
                          </label>
                          <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder="Enter Your Email"
                            style={{
                              borderBottom: "0.5px solid black",
                            }}
                            disabled
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Enter New Password"
                            style={{
                              borderBottom: "0.5px solid black",
                            }}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="exampleInputPhone"
                            className="form-label"
                          >
                            Phone
                          </label>
                          <input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            type="text"
                            className="form-control"
                            id="exampleInputPhone"
                            placeholder="Enter Your Phone"
                            style={{
                              borderBottom: "0.5px solid black",
                            }}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="exampleInputAddress"
                            className="form-label"
                          >
                            Address
                          </label>
                          <input
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            type="text"
                            className="form-control"
                            id="exampleInputAddress"
                            placeholder="Enter Your Address"
                            style={{
                              borderBottom: "0.5px solid black",
                            }}
                          />
                        </div>

                        <div className="text-center mt-3">
                          <button type="submit" className="btn btn-danger mb-3">
                            Update
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
