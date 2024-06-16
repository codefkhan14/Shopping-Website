import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/MyOrders.css";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { UserContext } from "../context/userContext";
import { GET_ORDER } from "./Apis";

const MyOrders = () => {
  const navigate = useNavigate();
  const { userInfo } = useContext(UserContext);
  const [orderData, setOrderData] = useState(null);
  // {FATCH ORDER DATA }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestBody = {
          userId: userInfo?.finalData?.user?.userId,
        };

        const response = await axios.post(GET_ORDER, requestBody);
        setOrderData(response?.data.reverse());
      } catch (error) {
        console.log("get cart data error", error);
      }
    };

    if (userInfo?.finalData?.token) {
      fetchData();
    }
  }, [userInfo]);

  // {ORDER FILTER }
  const [btnStatus, setBtnStatus] = useState("All");
  const OrderFilter = (status) => {
    setBtnStatus(status);
    console.log(status);
  };
  const navigateOrder = (orderId) => {
    console.log(orderId);
    navigate(`/myorders/${orderId}`);
  };

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
        {[
          "All",
          "Placed",
          "Confirm",
          "Dispatched",
          "Delivered",
          "Cancelled",
        ].map((status) => (
          <div key={status}>
            <button
              className={btnStatus === status ? "btn-active" : ""}
              onClick={() => OrderFilter(status)}
            >
              {status}
            </button>
          </div>
        ))}
      </div>
      {/* horizontal line  */}
      <div className="myorders-horiline"></div>
      {/* order list  */}
      <div className="myorders-list">
        {orderData?.filter(
          (item) => btnStatus === "All" || item?.status === btnStatus
        ).length > 0 ? (
          orderData
            ?.filter(
              (item) => btnStatus === "All" || item?.status === btnStatus
            )
            .map((item) => (
              <div
                key={item?.orderId}
                className="myorders-container"
                onClick={() => navigateOrder(item?.orderId)}
              >
                {/* topper orderr id and status  */}
                <div className="myorders-cotainer1">
                  <div>
                    <p>
                      Order ID: #{item?.orderId}{" "}
                      <span
                        className={
                          item?.status === "Cancelled"
                            ? "myorder-status myorder-status-cancel"
                            : item?.status === "Delivered"
                            ? "myorder-status myorder-status-delivered"
                            : "myorder-status"
                        }
                      >
                        • {item?.status}
                      </span>
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
            ))
        ) : (
          <div className="no-orders-message">
            No orders {btnStatus === "All" ? "" : btnStatus.toLowerCase() + " "}
            yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
