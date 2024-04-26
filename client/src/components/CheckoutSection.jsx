import React, { useContext, useState } from "react";
import "../style/Checkout.css";
import axios from "axios";
// import Razorpay from "razorpay";
import { UserContext } from "../context/userContext";
import { PAYMENT, PAYMENTVERIFY } from "./Apis";
const CheckoutSection = () => {
  const { cartData, userInfo } = useContext(UserContext);

  const [deliveryFrom, setDeliveryFrom] = useState({
    country: "india",
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });
  const truncateText = (text, maxWords) => {
    if (text.lenth < maxWords) return text;
    return text.slice(0, maxWords) + "...";
  };
  let subtotal = 0;
  let shipping = 0;
  let total = 0;

  if (cartData && cartData.length > 0) {
    subtotal = cartData.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    total = Math.round(subtotal * 0.18 + subtotal);
  }
  const handleInput = (e) => {
    setDeliveryFrom({
      ...deliveryFrom,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestBody = {
      payment: total,
      receipt: "sfojwoejfo30",
      userId: userInfo?.user?.userId,
    };
    const response = await axios.post(PAYMENT, requestBody);
    const options = {
      key: "rzp_test_VIMg5R33m4Tjpx",
      amount: response.data.amount,
      currency: "INR",
      name: "Bandhej Hub",
      description: "Test Transaction",
      image:
        "https://startupxplore.com/uploads/ff8080817278850f01727a13a9ac00e9-large.png",
      order_id: response.data.id,
      callback_url: PAYMENTVERIFY,
      prefill: {
        name: deliveryFrom.name,
        email: "gaurav.kumar@example.com",
        contact: deliveryFrom.phone,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
  };
  return (
    <div className="checkout-section">
      <div className="checkout-delivery-section">
        <h4>Delivery Details</h4>
        <form method="POST" onSubmit={handleSubmit}>
          <div>
            <input type="text" required value="India" disabled />
          </div>

          <div>
            <input
              type="text"
              required
              placeholder="Full Name"
              name="name"
              value={deliveryFrom.name}
              onChange={handleInput}
            />
          </div>

          <div>
            <input
              type="text"
              required
              placeholder="Address"
              name="address"
              value={deliveryFrom.address}
              onChange={handleInput}
            />
          </div>

          <div className="checkout-delivery-section-landmark-input">
            <input
              type="text"
              required
              placeholder="City"
              name="city"
              value={deliveryFrom.city}
              onChange={handleInput}
            />
            <input
              style={{ margin: "0 10px" }}
              type="text"
              required
              placeholder="State"
              name="state"
              value={deliveryFrom.state}
              onChange={handleInput}
            />
            <input
              type="text"
              required
              placeholder="PIN code"
              name="pincode"
              value={deliveryFrom.pincode}
              onChange={handleInput}
            />
          </div>
          <div>
            <input
              type="text"
              required
              placeholder="Phone Number"
              name="phone"
              value={deliveryFrom.phone}
              onChange={handleInput}
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
