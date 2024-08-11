import React from "react";
import Layout from "../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const About = () => {
  return (
    <Layout title={"About us - Shopify"}>
      {/* <div className="container"> */}
      <div
        className="row contactus"
        style={{ marginTop: "0px", marginLeft: " 30px" }}
      >
        <div className="col-md-6">
          <img
            src="\images\about.jpeg"
            alt="Contact Us"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4" style={{ marginTop: "65px" }}>
          <h1 className="bg-danger p-2 text-white text-center">About Us</h1>
          <p className="text-justify mt-2">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed ea
            unde molestiae, commodi nesciunt voluptate eligendi. Vel, aut!
            Nesciunt, qui eius dolore rerum nisi nulla magnam ea aperiam ex at.
          </p>
        </div>
      </div>
      {/* </div> */}
    </Layout>
  );
};

export default About;
