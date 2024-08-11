import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/Cart";
import toast from "react-hot-toast";
const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([])
  const [cart, setCart] = useCart()

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id)
    } catch (error) {}
  };
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params.slug]);

  // get similar products
  const getSimilarProduct = async (pid, cid) => {
    try {
        const {data} = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`)
        setRelatedProducts(data?.products)
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <Layout>
      <div className="row container m-3">
        <div className="col-md-4">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
          />
        </div>
        <div className="col-md-6">
            <h1 className="text-center">Product details</h1>
            <h6>name: {product.name}</h6>
            <h6>description: {product.description}</h6>
            <h6>Price : $ {product.price}</h6>
            {/* <h6>Category : {product.category.name}</h6> */}
            <button className="btn btn-danger mt-3" onClick={() => {
                    setCart([...cart,product]);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, product])
                    );
                    toast.success("Item added to cart");
                  }}>Add to cart</button>
        </div>
      </div>
      {/* hello */}
      <hr style={{border: '1px solid black'}}/>
      <div className="m-3">
        <h2>Similar product</h2>
        {relatedProducts.length < 1 && <p>No similar products</p>}
        <div className="row">
            {relatedProducts?.map((p) => (
              <div className="col-md-5 m-3 col-lg-3" key={p._id}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text">{p.category.name}</p>
                  <p className="card-text">price - {p.price}$</p>
                  <button
                    className="btn btn-danger ms-2"
                    onClick={() => {navigate(`/product/${p.slug}`); window.location.reload();}}
                  >
                    Details
                  </button>
                  <button className="btn btn-outline-danger ms-2"
                  onClick={() => {
                    setCart([...cart,product]);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, product])
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
        </div>
    </Layout>
  );
};

export default ProductDetails;
