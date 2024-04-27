const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
require("../database/connection");
const User = require("../model/userSchema");
const paysuc = process.env.paymentsucess;

let userTheId = "";
const orderObj = {
  date: "",
  orderDetails: "",
  productDetails: "",
};

router.post("/payment", async (req, res) => {
  const { payment, receipt, userId, order } = req.body;
  orderObj.date = order?.data;
  orderObj.orderDetails = order?.orderDetails;
  orderObj.productDetails = order?.productDetails;
  userTheId = userId;
  const instance = new Razorpay({
    key_id: process.env.PAYMENT_GATEWAY_KEY_ID,
    key_secret: process.env.PAYMENT_GATEWAY_SECRET_KEY,
  });
  const options = {
    amount: Number(payment * 100),
    currency: "INR",
    receipt: receipt,
  };
  try {
    const order = await instance.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/payment/verification", async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;

  // Create an HMAC object with the SHA256 hash function and the secret key
  const hmac = crypto.createHmac(
    "sha256",
    process.env.PAYMENT_GATEWAY_SECRET_KEY
  );
  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
  const generated_signature = hmac.digest("hex");

  if (generated_signature === razorpay_signature) {
    // Perform the database update before redirect
    User.findOneAndUpdate(
      { _id: userTheId },
      {
        $push: {
          orders: {
            orderId: razorpay_order_id,
            date: orderObj.date,
            orderDetails: orderObj.orderDetails, // Assuming you have access to orderObj
            productDetails: orderObj.productDetails, // Assuming you have access to orderObj
          },
        },
      },
      { new: true }
    )
      .then((result) => {
        res.redirect(`${paysuc}?reference=${razorpay_payment_id}`); // thank you page
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      });
  } else {
    res.status(400).json({
      success: false,
      message: "Payment verification failed",
    });
  }
});

module.exports = router;
