import React, { useContext } from "react";
import "../style/Checkout.css";
import { UserContext } from "../context/userContext";
const CheckoutSection = () => {
  const { cartData } = useContext(UserContext);
  const truncateText = (text, maxWords) => {
    if (text.lenth < maxWords) return text;
    return text.slice(0, maxWords) + "...";
  };
  let subtotal = 0;
  let shipping = 0;
  let total = 0;

  // Calculate subtotal for all items in the cart
  if (cartData && cartData.length > 0) {
    subtotal = cartData.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }
  return (
    <div className="checkout-section">
      <div className="checkout-delivery-section">
        <h4>Delivery Details</h4>
        <form>
          <div>
            <input type="text" required value="India" disabled />
          </div>

          <div className="checkout-delivery-section-name-input">
            <input
              style={{ marginRight: "10px" }}
              type="text"
              required
              placeholder="First name"
              name="firstname"
            />
            <input
              type="text"
              required
              placeholder="Last name"
              name="lastname"
            />
          </div>

          <div>
            <input type="text" required placeholder="Address" name="address" />
          </div>

          <div className="checkout-delivery-section-landmark-input">
            <input type="text" required placeholder="City" name="city" />
            <input
              style={{ margin: "0 10px" }}
              type="text"
              required
              placeholder="State"
              name="state"
            />
            <input type="text" required placeholder="PIN code" name="pincode" />
          </div>
          <div>
            <input
              type="text"
              required
              placeholder="Phone Number"
              name="phoneNumber"
            />
          </div>

          <div className="checkout-delivery-section-submit-input">
            <input type="submit" value="Pay now" />
          </div>
        </form>
      </div>
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
            <p>₹{subtotal}.00</p>
            <p>₹{shipping}.00</p>
            <p>₹{Math.round(subtotal * 0.18)}.00</p>
            <p style={{ fontSize: "17px" }}>
              ₹{Math.round(subtotal * 0.18 + subtotal)}.00
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSection;
