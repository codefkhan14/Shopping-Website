require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(
  cors({
    origin: [process.env.FRONTEND_LOCAL_URL, process.env.FRONTEND_HOSTED_URL],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./database/connection");
require("./model/userSchema");
require("./model/productSchema");

app.use("/user", require("./routes/authRoute"));
app.use("/admin", require("./routes/adminRoute"));
app.use("/user", require("./routes/productRoute"));
app.use("/payment", require("./routes/paymentRoute"));
app.use("/order", require("./routes/orderRoute"));

app.listen(process.env.PORT);
