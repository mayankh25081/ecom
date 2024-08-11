import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { prices } from "../components/Routes/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/Cart";
import toast from "react-hot-toast";

const HomePage = () => {
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`/api/v1/category/all-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  //get all products
  const getAllProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(true);
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    if (!checked.length && !radio.length) getAllProduct();
  }, []);

  // get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/product-count`);
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  // load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // filter by cat
  const handlerFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  // get filtered products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`/api/v1/product/product-filters`, {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  return (
    <Layout title={"Shopify"}>
      <div className="row">
        <div className="col-md-9 col-sm-10">
          {/* {JSON.stringify(radio, null, 4)} */}
          {/* <div className="d-flex flex-wrap"> */}
          <h2 className="m-3">
            Top Deals for You
          </h2>
          <div className="row" style={{justifyContent: 'space-between'}}>
            {products?.map((p) => (
              <div
                className="col-md-5 m-3 col-lg-3 col-sm-9 p-3"
                key={p._id}
                style={{
                  boxShadow: "8px 8px 8px rgba(100, 100, 100, 0.4)"
                }}
              >
                <div style={{
                  width: '100%',
                  height: '150px'
                }}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  style={{height: "100%", width: '100%',  objectFit: "contain"}}
                /></div>
                <div className="card-body mt-3">
                  <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                  <h5 className="card-title">{p.name}</h5>
                  <h5 className="card-text">${p.price}</h5>
                  </div>
                  <p className="card-text">
                    {p.description.substring(0, 25)}...
                  </p>
                  <p className="card-text">{p.category.name}</p>
                  <button
                    className="btn btn-danger ms-2 mt-3"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    Details
                  </button>
                  <button
                    className="btn btn-outline-danger ms-2 mt-3"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Item added to cart");
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-outline-danger"
                style={{ width: "85%" }}
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div>
        </div>
        <div className="col-md-3 mt-2" style={{ borderRight: "1px solid gray" }}>
          <h4
            className="text-center"
            style={{
              fontWeight: "600",
              borderBottom: "1px solid red",
            }}
          >
            Filter By Category
          </h4>
          <div className="d-flex flex-column m-3">
            {categories.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handlerFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* price filter */}
          <h4
            className="text-center mt-5"
            style={{
              fontWeight: "600",
              borderBottom: "1px solid red",
            }}
          >
            Filter By Price
          </h4>
          <Radio.Group onChange={(e) => setRadio(e.target.value)}>
            <div className="d-flex flex-column m-3">
              {prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </div>
          </Radio.Group>
          <div className="d-flex flex-column m-3">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
