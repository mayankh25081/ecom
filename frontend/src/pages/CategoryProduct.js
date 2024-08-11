import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useCart } from '../context/Cart'

const CategoryProduct = () => {
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState([])
    const [cart, setCart] = useCart()
    const params = useParams()
    const navigate = useNavigate()
    const getProductByCat = async () => {
        try {
            const {data} = await axios.get(`/api/v1/product/product-category/${params.slug}`)
            setProducts(data?.products)
            setCategory(data?.category)
        } catch (error) {
            console.log(error)

        }
    }
    useEffect(() => {
        if(params?.slug) getProductByCat();
    }, [params?.slug])
  return (
    <Layout>
      <div className="container" style={{backgroundColor: '#fae6e6'}}>
        <h1 className='mt-3 text-center' style={{color: '#bb2124'}}>{category?.name}</h1>
        {products.length < 1 && <h6>No Products available in this category</h6>}
        <div className="row">
            {products?.map((p) => (
              <div className="col-md-5 m-3 col-lg-3 shadow" key={p._id}>
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
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    Details
                  </button>
                  <button className="btn btn-outline-danger ms-2" 
                  onClick={() => {
                    setCart([...cart,p]);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, p])
                    );
                    toast.success("Item added to cart");
                  }}>
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
      </div>
    </Layout>
  )
}

export default CategoryProduct
