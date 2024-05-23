import React from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h2>Privacy Policy</h2>
          <p>
            <strong>Introduction</strong><br/>
            We value the trust you place in us and are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your personal information.
          </p>
          <p>
            <strong>Information We Collect</strong><br/>
            We may collect the following types of information:
            <ul>
              <li><strong>Personal Information:</strong> Name, email address, phone number, shipping address, billing information, and payment details.</li>
              <li><strong>Account Information:</strong> Username, password, and other authentication details.</li>
              <li><strong>Order Information:</strong> Details of the products you purchase, order history, and transaction information.</li>
              <li><strong>Technical Information:</strong> IP address, browser type, device information, and browsing behavior on our website.</li>
            </ul>
          </p>
          
           
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
