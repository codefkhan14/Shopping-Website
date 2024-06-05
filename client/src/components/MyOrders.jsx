import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../style/MyOrders.css";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { UserContext } from "../context/userContext";
import { GET_ORDER } from "./Apis";

const MyOrders = () => {
  const { userInfo } = useContext(UserContext);
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestBody = {
          userId: userInfo?.finalData?.user?.userId,
        };

        const response = await axios.post(GET_ORDER, requestBody);
        console.log(response.data);
        setOrderData(response?.data.reverse());
      } catch (error) {
        console.log("get cart data error", error);
      }
    };

    if (userInfo?.finalData?.token) {
      fetchData();
    }
  }, [userInfo]);

  return (
    <div className="myorders-page">
      {/* navigation bar  */}
      <div className="product-details-top-container-navigation">
        <p>
          <Link to="/">Home</Link> | <Link>My orders</Link>
        </p>
      </div>
      {/* category buttons  */}
      <div className="myorders-category">
        <div>
          <button className="btn-active">All Orders</button>
        </div>
        <div>
          <button>Placed</button>
        </div>
        <div>
          <button>Confirm</button>
        </div>
        <div>
          <button>Dispatched</button>
        </div>
        <div>
          <button>Delivered</button>
        </div>
        <div>
          <button>Cancelled</button>
        </div>
      </div>
      {/* horizontal line  */}
      <div className="myorders-horiline"></div>
      {/* order list  */}
      <div className="myorders-list">
        {orderData?.map((item) => (
          <div key={item?.orderId} className="myorders-container">
            {/* topper orderr id and status  */}
            <div className="myorders-cotainer1">
              <div>
                <p>
                  Order ID: #{item?.orderId} <span>{item?.status}</span>{" "}
                </p>
                <p>Placed on : {item?.date} | Arrive in : Today</p>
                {/* <p>Placed on : 8 Jan 2022 | Arrive in : Today</p> */}
              </div>

              <div>Total ₹{item?.orderDetails?.prices?.total}</div>
            </div>
            {/* product list  */}
            {item?.productDetails?.map((item2) => (
              <div key={item2?.productId} className="myorders-cotainer2">
                <div className="myorders-container2-left">
                  <div>
                    <img src={item2?.image} alt="" />
                  </div>

                  <div>
                    <p>{item2?.name}</p>
                    <p>
                      {item2?.category} | Item-{item2?.quantity}
                    </p>
                    <p>Price : ₹{item2?.price}</p>
                  </div>
                </div>

                <div className="myorders-container2-right">
                  <i>
                    <MdOutlineKeyboardArrowRight />
                  </i>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
