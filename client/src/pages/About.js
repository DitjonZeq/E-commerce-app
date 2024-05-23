import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About Us - ECOMMERCE APP"}>
      <div className="row contactus">
        <div className="col-md-6">
          <img
            src="/images/about.jpeg"
            alt="About Us"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h2>About Us</h2>
          <p className="text-justify mt-2">
            Welcome to ECOMMERCE APP, your number one source for all things [Product Categories]. We're dedicated to providing you the very best of [Product Types], with an emphasis on quality, customer service, and uniqueness.
          </p>
          <p className="text-justify mt-2">
            Founded in [Year] by [Founder's Name], Ecomerce has come a long way from its beginnings in [Starting Location]. When [Founder's Name] first started out, their passion for [Industry/Products] drove them to start their own business.
          </p>
          <p className="text-justify mt-2">
            We now serve customers all over [Country/World], and are thrilled that we're able to turn our passion into our own website. We aim to offer our customers a variety of the latest [Products]. We’ve come a long way, so we know exactly which direction to take when supplying you with high quality yet budget-friendly products.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
