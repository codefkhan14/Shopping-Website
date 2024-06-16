import React, { useContext } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { MdKeyboardArrowDown } from "react-icons/md";
import "../style/OrderDetails.css";
import { UserContext } from "../context/userContext";

const OrderDetails = () => {
  const { cartData } = useContext(UserContext);
  const truncateText = (text, maxWords) => {
    if (text.lenth < maxWords) return text;
    return text.slice(0, maxWords) + "...";
  };
  return (
    <div className="OrderDetails">
      <div className="order-details-top">
        <div className="order-details-top-first">
          <div>
            <i>
              <FiArrowLeft />
            </i>
            <p>Order #13949292</p>
          </div>

          <div>Placend on : 8 Jan 2022 | Arrive in : Today</div>
        </div>

        <div className="order-details-top-second">
          <button>Get Invoice</button>

          <button>
            Manage
            <i>
              <MdKeyboardArrowDown />
            </i>
          </button>
        </div>
      </div>

      <div className="order-details-second">
        <div>
        <div className="order-details-second-first">
          <div>
            <h3>Order Details</h3>
            <p>Contact Information</p>
            <p>Contact Information</p>
            <p>Contact Information</p>
            <p>Contact Information</p>
            <p>Contact Information</p>
            <p>Contact Information</p>
            <p>Contact Information</p>
          </div>

          <div>
            <p>Contact Information</p>
            <p>Contact Information</p>
            <p>Contact Information</p>
            <p>Contact Information</p>
            <p>Contact Information</p>
            <p>Contact Information</p>
          </div>
        </div>
        <div className="order-details-second-first">
          <div>
            <h3>Order Details</h3>
            <p>Contact Information</p>
            <p>Contact Information</p>
            <p>Contact Information</p>
            <p>Contact Information</p>
            <p>Contact Information</p>
            <p>Contact Information</p>
            <p>Contact Information</p>
          </div>

          <div>
            <p>Contact Information</p>
            <p>Contact Information</p>
            <p>Contact Information</p>
            <p>Contact Information</p>
            <p>Contact Information</p>
            <p>Contact Information</p>
          </div>
        </div>

        </div>

        <div className="order-details-second-second">
          <div className="checkout-cart-section">
            <div>
              <table>
                <tbody>
                  {cartData?.map((item) => (
                    <tr className="checkout-cart-content" key={item?._id}>
                      <td>
                        <div className="checkout-cart-images-detail">
                          <div>
                            <img src={item?.image} alt="Loading..." />
                            <span>{item?.quantity}</span>
                          </div>
                          <div className="checkout-cart-detail">
                            <p>{truncateText(item?.name, 40)}</p>
                            <p>{item?.category}</p>
                            <p>Price: ₹{item?.price}.00</p>
                          </div>
                        </div>
                      </td>

                      <td>₹{item?.price * item?.quantity}.00</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="checkout-cart-section-payment-detail">
              <div>
                <p>Subtotal</p>
                <p>Shipping</p>
                <p>Estimates taxes (18% GST)</p>
                <p style={{ fontSize: "17px" }}>Total</p>
              </div>
              <div>
                <p>₹230.00</p>
                <p>₹183.00</p>
                <p>₹38.00</p>
                <p style={{ fontSize: "17px" }}>₹3858.00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
