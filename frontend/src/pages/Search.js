import React from "react";
import { useSearch } from "../context/Search";
import Layout from "../components/Layout/Layout";
const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout title={"search results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "no products found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="row">
            {values?.results.map((p) => (
              <div className="col-md-5 m-3 col-lg-3" key={p._id}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0,30)}...</p>
                  <p className="card-text">{p.category.name}</p>
                  <p className="card-text">price - {p.price}$</p>
                  <button className="btn btn-danger ms-2">Details</button>
                  <button className="btn btn-outline-danger ms-2">
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
