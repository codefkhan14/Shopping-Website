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

app.listen(process.env.PORT);
