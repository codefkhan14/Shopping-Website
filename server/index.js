const dotenv = require("dotenv");
const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
const Razorpay = require("razorpay");
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./database/connection");
require("./model/userSchema");
require("./model/productSchema");
app.use(require("./router/auth"));
app.use(require("./router/payment"));
app.use(require("./router/admin"));
app.use(require("./router/product"));

// const instance = new Razorpay({
//   key_id: "rzp_test_VIMg5R33m4Tjpx",
//   key_secret: "FEKNXvr9Kr8xEfKckNIKh7jr",
// });

// var instance = new Razorpay({
//   key_id: "rzp_test_VIMg5R33m4Tjpx",
//   key_secret: "FEKNXvr9Kr8xEfKckNIKh7jr",
// });

// instance.orders.create({
//   amount: 50000,
//   currency: "INR",
//   // receipt: "receipt#1",
//   // notes: {
//   //   key1: "value3",
//   //   key2: "value2",
//   // },
// });

// module.exports = instance;
app.listen(process.env.PORT);

// function pingLink() {
//   const linkToPing = "https://bandhejhub.onrender.com/furkan";
//   let data = axios.get(linkToPing);
//   data.then((res) => {});
// }

// const pingInterval = 11 * 60 * 1000;
// setInterval(pingLink, pingInterval);
