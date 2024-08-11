import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-products`
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong",{duration: 5000});
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="row">
        <div className="col-md-4 col-lg-3">
          <AdminMenu />
        </div>
        <div className="col-md-8 col-lg-9">
          <h1 className="text-center" style={{color: '#bb2124'}}>All Products List</h1>
          <div className="row">
            {products?.map((p) => (
              <div className="col-md-6 col-lg-4" key={p._id} >
                <Link
                  to={`/dashboard/admin/product/${p.slug}`}
                  className="card m-4"
                  style={{ textDecoration: "none" }}
                >
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description.substring(0,20)}...</p>
                    <a href="#" className="btn btn-danger">
                      Manage product
                    </a>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
