require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const passport = require("passport");
require("./passport.js");
const session = require("express-session");

app.use(
  session({
    secret: "bandhejhub",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 24 hours
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: [process.env.FRONTEND_LOCAL_URL, process.env.FRONTEND_HOSTED_URL],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

// Remove or avoid setting COOP headers for development
// app.use((req, res, next) => {
//   res.removeHeader("Cross-Origin-Opener-Policy");
//   res.removeHeader("Cross-Origin-Embedder-Policy");
//   next();
// });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./database/connection");
require("./model/userSchema");
require("./model/productSchema");

app.use("/user", require("./routes/authRoute"));
app.use("/auth", require("./routes/authGoogleRoute.js"));
app.use("/admin", require("./routes/adminRoute"));
app.use("/user", require("./routes/productRoute"));
app.use("/payment", require("./routes/paymentRoute"));
app.use("/order", require("./routes/orderRoute"));

app.listen(process.env.PORT);
