import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useSubCategory from "../hooks/useSubCategory";
import Layout from "../components/Layout/Layout";
const SubCategories = () => {
  const subcategories = useSubCategory();
  return (
    <Layout title={"All subCategories"}>
      <div className="container" style={{ marginTop: "100px" }}>
        <div className="row container">
          {subcategories.map((s) => (
            <div className="col-md-4 mt-5 mb-3 gx-3 gy-3" key={s._id}>
              <div className="card">
                <Link to={`/subcategory/${s.slug}`} className="btn cat-btn">
                  {s.subname}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default SubCategories;
