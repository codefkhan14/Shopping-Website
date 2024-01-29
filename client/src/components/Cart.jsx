import React, { useContext } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import "../style/Cart.css";
import { UserContext } from "../context/userContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { REMOVE_CART_DATA } from "./Apis";

const Cart = () => {
  const { cartData, userInfo, setRemoveCartData } = useContext(UserContext);
  const toastOption = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  let subtotal = 0;

  // Calculate subtotal for all items in the cart
  if (cartData && cartData.length > 0) {
    subtotal = cartData.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }

  const removeCartData = async (postId) => {
    try {
      const requestBody = {
        postId: postId,
        userId: userInfo?.user?.userId,
      };
      const response = await axios.post(REMOVE_CART_DATA, requestBody);
      setRemoveCartData(response.data);
      toast.success(response.data.message, toastOption);
    } catch (error) {
      toast.error(error.response.data.error, toastOption);
    }
  };
  return (
    <div className="cart-main-section">
      {cartData?.length > 0 ? (
        <>
          <div className="cart-section">
            <div className="cart-heading">
              <div>
                <h2>Shopping Cart</h2>
              </div>
              <div>
                <h2>{cartData?.length} Items</h2>
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>PRODUCT</th>
                  <th>PRICE</th>
                  <th>QUANTITY</th>
                  <th>SUBTOTAL</th>
                  <th>REMOVE</th>
                </tr>
              </thead>
              <tbody>
                {cartData?.map((item) => (
                  <tr className="cart-content" key={item?._id}>
                    <div className="cart-images-detail">
                      <div>
                        <td>
                          <img src={item?.image} alt="" />
                        </td>
                      </div>
                      <div className="cart-detail">
                        <td>{item?.name}</td>
                        <td>{item?.category}</td>
                      </div>
                    </div>
                    <td>₹{item?.price}</td>
                    <td>{item?.quantity}</td>
                    <td>{item?.price * item?.quantity}</td>
                    <td>
                      <i
                        style={{ cursor: "pointer" }}
                        onClick={() => removeCartData(item?._id)}
                      >
                        <RiDeleteBin6Line />
                      </i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="cart-amount">
              <div className="cart-amount-rupee">
                <h3>Subtotal</h3>
                <h3>₹{subtotal}</h3>
              </div>
              <div className="cart-amount-rupee">
                <h3>GST(%)</h3>
                <h3>18%</h3>
              </div>
              <div className="cart-amount-rupee">
                <h3>Total</h3>
                <h3>₹{subtotal * 0.18 + subtotal}</h3>
              </div>

              <div className="cart-amount-buttons">
                <div>
                  <Link to="/">
                    <button>Continue Shopping</button>
                  </Link>
                </div>
                <div>
                  <button>
                    <a
                      href="https://wa.me/7740930250"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Checkout
                    </a>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer />
        </>
      ) : (
        <h3 className="cart-data-not-available">Cart Data Not Available!</h3>
      )}
    </div>
  );
};

export default Cart;
