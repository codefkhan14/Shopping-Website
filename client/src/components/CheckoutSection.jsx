import React, { useContext } from "react";
import "../style/Checkout.css";
import { UserContext } from "../context/userContext";
const CheckoutSection = () => {
  const { cartData } = useContext(UserContext);
  const truncateText = (text, maxWords) => {
    if (text.lenth < maxWords) return text;
    return text.slice(0, maxWords) + "...";
  };
  return (
    <div className="checkout-section">
      <div className="checkout-delivery-section">
        <h4>Delivery Details</h4>
        <form>
          <div>
            <input type="text" required value="India" disabled />
          </div>

          <div className="name">
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

          <div className="landmark">
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

          <div className="submit">
            <input type="submit" value="Pay now" />
          </div>
        </form>
      </div>
      <div className="checkout-cart-section">
        <table>
          <tbody>
            {cartData?.map((item) => (
              <tr className="checkout-cart-content" key={item?._id}>
                <td>
                  <div className="checkout-cart-images-detail">
                    <div>
                      <img src={item?.image} alt="Loading..." />
                    </div>
                    <div className="checkout-cart-detail">
                      <p>{truncateText(item?.name, 40)}</p>
                      <p>{item?.category}</p>
                      <p>Price:₹{item?.price}.00</p>
                    </div>
                  </div>
                </td>

                <td>₹{item?.price * item?.quantity}.00</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CheckoutSection;
