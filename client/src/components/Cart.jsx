import React, { useContext } from "react";
import "../style/Cart.css";
import { UserContext } from "../context/userContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { REMOVE_CART_DATA } from "./Apis";
import CartPic from "../assets/cart.png";

const Cart = () => {
  const { cartData, userInfo, setRemoveCartData } = useContext(UserContext);
  const navigate = useNavigate();
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

  const handleOpen = (item) => {
    let itemName = item?.name.replace(/\s+/g, "-");
    navigate(`/${item.category}/${itemName}/${item?.productId}`);
  };
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
                  <th>QUANTITY</th>
                  <th>SUBTOTAL</th>
                </tr>
              </thead>

              <tbody>
                {cartData?.map((item) => (
                  <tr
                    className="cart-content"
                    key={item?._id}
                    onClick={() => handleOpen(item)}
                  >
                    <td>
                      <div className="cart-images-detail">
                        <div>
                          <img src={item?.image} alt="" />
                        </div>

                        <div className="cart-detail">
                          <p>{item?.name}</p>
                          <p>Price: ₹{item?.price}</p>
                          <p onClick={() => removeCartData(item?._id)}>
                            Remove
                          </p>
                        </div>
                      </div>
                    </td>

                    <td>{item?.quantity}</td>
                    <td>₹{item?.price * item?.quantity}</td>
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
        <div className="cart-data-not-found">
          <div>
            <img src={CartPic} alt="" />
          </div>
          <div>
            <h3 className="cart-data-not-available">Your cart is empty</h3>
            <p>
              You have no items in your shopping cart <br /> Let's go buy
              something
            </p>
          </div>
          <div>
            <Link to="/">
              <button>Shop Now</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
