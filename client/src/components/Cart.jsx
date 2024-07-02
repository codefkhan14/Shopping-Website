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
  const { currency, cartData, userInfo, setRemoveCartData, setCheckoutData } =
    useContext(UserContext);
  const navigate = useNavigate();
  const check = (price) => {
    if (currency === "USD $") return `$${price} USD`;
    else if (currency === "EUR €") return `€${price} EUR`;
    else if (currency === "GBP £") return `£${price} GBP`;
    else return `Rs.${price * 1000}.00`;
  };

  const CurrencyPrice = (price) => {
    if (currency === "USD $") return `$${(price / 84 + 4).toFixed(2)} USD`;
    else if (currency === "EUR €")
      return `€${(price / 90 + 3.8).toFixed(2)} EUR`;
    else if (currency === "GBP £")
      return `£${(price / 106 + 3.5).toFixed(2)} GBP`;
    else return `Rs.${price}.00`;
  };
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
    subtotal = cartData.reduce((acc, item) => {
      const price = parseFloat(
        CurrencyPrice(item?.price).replace(/[^0-9.]+/g, "")
      );
      return acc + price * item?.quantity;
    }, 0);
    subtotal = check(subtotal);
  }

  const handleOpen = (item) => {
    let itemName = item?.name.replace(/\s+/g, "-");
    navigate(
      `/${item.category}/${itemName}/${item?.itemId}/${item?.productId}`
    );
  };
  const removeCartData = async (postId) => {
    try {
      const requestBody = {
        postId: postId,
        userId: userInfo?.finalData?.user?.userId,
      };
      const response = await axios.post(REMOVE_CART_DATA, requestBody);
      setRemoveCartData(response.data);
      toast.success(response.data.message, toastOption);
    } catch (error) {
      toast.error(error.response.data.error, toastOption);
    }
  };
  // const handleCheckout = () => {
  //   setCheckoutData(cartData);
  //   navigate("/checkout");
  // };
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
                  <tr className="cart-content" key={item?._id}>
                    <td>
                      <div className="cart-images-detail">
                        <div>
                          <img
                            style={{ cursor: "pointer" }}
                            src={item?.image}
                            onClick={() => handleOpen(item)}
                            alt=""
                          />
                        </div>

                        <div className="cart-detail">
                          <p>{item?.name}</p>
                          <p>Price: {CurrencyPrice(item?.price)}</p>
                          <p onClick={() => removeCartData(item?._id)}>
                            Remove
                          </p>
                        </div>
                      </div>
                    </td>

                    <td>{item?.quantity}</td>
                    <td>
                      {check(
                        parseFloat(
                          CurrencyPrice(item?.price).replace(/[^0-9.]+/g, "")
                        ) * item?.quantity
                      )}
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
                <h3>{subtotal}</h3>
              </div>
              {/* <div className="cart-amount-rupee">
                <h3>GST(%)</h3>
                <h3>18%</h3>
              </div>
              <div className="cart-amount-rupee">
                <h3>Shipping</h3>
                <h3>₹60</h3>
              </div> */}
              <div className="cart-amount-rupee">
                <h3>Total</h3>
                <h3>{subtotal}+Ship</h3>
                {/* <h3>₹{Math.round(subtotal * 0.18 + subtotal)}</h3> */}
              </div>

              <div className="cart-amount-buttons">
                <div>
                  <button
                  // onClick={handleCheckout}
                  >
                    <a
                      href="https://wa.me/7740930250"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Order Now
                    </a>
                    {/* Checkout */}
                  </button>
                </div>
                <div>
                  {" "}
                  <Link to="/">
                    <button>Continue Shopping</button>
                  </Link>
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
