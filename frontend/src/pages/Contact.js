import React from "react";
import Layout from "../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout title={"Contact us - Shopify"}>
      {/* <div className="container"> */}
      <div
        className="row contactus"
        style={{ marginTop: "30px", marginLeft: " 30px" }}
      >
        <div className="col-md-6">
          <img
            src="\images\contactus.jpeg"
            alt="Contact Us"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-danger p-2 text-white text-center">Contact Us</h1>
          <p className="text-justify mt-2">
            Any query and info about product feel free to call anytime we 24x7
            available
          </p>
          <p className="mt-3">
            <BiMailSend /> www.help@ecommerceapp.com
          </p>
          <p className="mt-3">
            <BiPhoneCall />: +91 8905977970
          </p>
          <p className="mt-3">
            <BiSupport /> : 1800-0000-0000 (toll free)
          </p>
        </div>
      </div>
      {/* </div> */}
    </Layout>
  );
};

export default Contact;
