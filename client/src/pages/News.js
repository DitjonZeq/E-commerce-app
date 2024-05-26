import React from "react";
import useNews from "../hooks/useNews";
import Layout from "../components/Layout/Layout";

const News = () => {
  const news = useNews();

  return (
    <Layout title={"All News"}>
      <div className="container" style={{ marginTop: "100px" }}>
        <div className="row">
          {news.map((n) => (
            <div className="col-md-4 mt-5 mb-3" key={n._id}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{n.title}</h5>
                  <p className="card-text">{n.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default News;
