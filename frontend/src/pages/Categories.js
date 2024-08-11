import React from "react";
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";
import catBack from '../images/catBack.jpg'

const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={"All categories"}>
      <div style={{ 
  backgroundImage: `url(${catBack})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
}}>
        <h1>All Categories</h1>
        <div className="container">
          <div className="row">
            {categories.map((c) => (
              <div
                className="col-md-6 m-5"
                key={c._id}
                style={{ height: "120px", width: "170px", background: "#e67a7a", borderRadius: '10%', boxShadow: "8px 8px 8px rgba(230, 122, 122, 0.7)",}}
              >
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Link
                    to={`/category/${c.slug}`}
                    className=" m-2"
                    style={{ textDecoration: "none", color: 'black', fontSize: '1.2rem'}}
                  >
                    {c.name}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
