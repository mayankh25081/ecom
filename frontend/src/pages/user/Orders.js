import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/Auth";
import moment from "moment";
import userDash from "../../images/userDash.avif";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  // get orders
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/auth/orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <Layout title={"Dashboard - Orders"}>
      <div className="container-fluid p-3" style={{
        width: '100vw',
          backgroundImage: `url(${userDash})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}>
        <div className="row">
          <div className="col-md-4 col-lg-3">
            <UserMenu />
          </div>
          <div className="col-md-8 col-lg-9">
            <h1 className="text-center" style={{color: '#bb2124'}}>All orders</h1>
            {orders?.map((o, i) => {
              if(o?.products.length!==0)
              return (
                <div >
                  <table className="table" style={{width: '80%'}}>
                    <thead >
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createdAt).fromNow()}</td>
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td>{o?.products.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="row">
                    {o?.products?.map((p, i) => (
                      <div className="m-2 card col-md-6 col-lg-3 shadow"style={{ background: "#e67a7a", boxShadow: "8px 8px 8px rgba(230, 122, 122, 0.7)",}}>
                        <div className="">
                          <img
                            src={`/api/v1/product/product-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                          />
                        </div>
                        <div className="col-md-9 m-3">
                          <p>{p.name}</p>
                          <p>{p.description.substring(0, 20)}</p>
                          <p>Price : ${p.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
              else return (
                <h5 className="text-center" style={{color: 'black'}}>Yet you are not ordered anything</h5>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
