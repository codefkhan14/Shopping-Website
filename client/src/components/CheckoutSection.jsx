import React, { useContext, useEffect, useState } from "react";
import "../style/Checkout.css";
import axios from "axios";
// import Razorpay from "razorpay";
import { UserContext } from "../context/userContext";
import { PAYMENT, PAYMENTVERIFY } from "./Apis";
const CheckoutSection = () => {
  const { cartData, userInfo } = useContext(UserContext);
  const [prices, setPrices] = useState({
    subtotal: "",
    shipping: "",
    tax: "",
    total: "",
  });

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);

    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };
  
  const [shippingDetails, setshippingDetails] = useState({
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

  useEffect(() => {
    if (cartData && cartData.length > 0) {
      const subtotal = cartData.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      let tax1 = subtotal * 0.18;
      let shipping = 20;
      let total1 = Math.round(subtotal + tax1 + shipping);
      setPrices({
        subtotal: subtotal,
        shipping: shipping,
        tax: tax1,
        total: total1,
      });
    }
  }, [cartData]);
  const handleInput = (e) => {
    setshippingDetails({
      ...shippingDetails,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderDetails = {
      shippingDetails: shippingDetails,
      prices: prices,
    };
    const order = {
      date: formatDate(new Date()),
      orderDetails: orderDetails,
      productDetails: cartData,
    };
    const requestBody = {
      payment: prices?.total,
      receipt: "sfojwoejfo30",
      userId: userInfo?.finalData?.user?.userId,
      order: order,
    };

    const response = await axios.post(PAYMENT, requestBody);
    const options = {
      key: process.env.REACT_APP_PAYMENT_GATEWAY_KEY_ID,
      amount: response.data.amount,
      currency: "INR",
      name: "Bandhej Hub",
      description: "Test Transaction",
      image:
        "https://startupxplore.com/uploads/ff8080817278850f01727a13a9ac00e9-large.png",
      order_id: response.data.id,
      callback_url: PAYMENTVERIFY,
      prefill: {
        name: shippingDetails.name,
        email: "gaurav.kumar@example.com",
        contact: shippingDetails.phone,
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
              value={shippingDetails.name}
              onChange={handleInput}
            />
          </div>

          <div>
            <input
              type="text"
              required
              placeholder="Address"
              name="address"
              value={shippingDetails.address}
              onChange={handleInput}
            />
          </div>

          <div className="checkout-delivery-section-landmark-input">
            <input
              type="text"
              required
              placeholder="City"
              name="city"
              value={shippingDetails.city}
              onChange={handleInput}
            />
            <input
              style={{ margin: "0 10px" }}
              type="text"
              required
              placeholder="State"
              name="state"
              value={shippingDetails.state}
              onChange={handleInput}
            />
            <input
              type="text"
              required
              placeholder="PIN code"
              name="pincode"
              value={shippingDetails.pincode}
              onChange={handleInput}
            />
          </div>
          <div>
            <input
              type="text"
              required
              placeholder="Phone Number"
              name="phone"
              value={shippingDetails.phone}
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
            <p>₹{prices?.subtotal}.00</p>
            <p>₹{prices?.shipping}.00</p>
            <p>₹{Math.round(prices?.tax)}.00</p>
            <p style={{ fontSize: "17px" }}>₹{Math.round(prices?.total)}.00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSection;
