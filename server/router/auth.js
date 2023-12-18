const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());

const allProductdata = require("../productdata/allproductdata");
const sareeData = require("../productdata/saree");
const dupattaData = require("../productdata/dupatta");
const dressData = require("../productdata/dress");
const lehangaData = require("../productdata/lehanga");

const User = require("../model/userSchema");
require("../database/connection");

router.get("/api/allProductdata/", (req, res) => {
  res.json(allProductdata);
});
router.get("/api/sareedata/", (req, res) => {
  res.json(sareeData);
});
router.get("/api/dupattadata/", (req, res) => {
  res.json(dupattaData);
});
router.get("/api/dressdata/", (req, res) => {
  res.json(dressData);
});
router.get("/api/lehangadata/", (req, res) => {
  res.json(lehangaData);
});

router.post("/user/register", async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "Email already exist" });
    }
    const user = new User({
      name: name,
      email: email,
      phone: phone,
      password: password,
    });
    await user.save();

    let expTime = "30days";
    let payload = { id: user?._id };
    let token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: expTime,
      audience: process.env.JWT_AUD,
    });
    let finalData = {
      user: {
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
      },

      token: token,
      expireTime: expTime,
    };
    return res.status(201).json(finalData);
  } catch (error) {
    console.log("register form error", error);
  }
});

router.post("/user/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userLogin = await User.findOne({ email: email });
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      if (!isMatch) {
        return res.status(400).json({ error: "Invalid Credidential" });
      } else {
        let expTime = "30 days";
        console.log(userLogin._id);
        let payload = { id: userLogin._id };
        let token = jwt.sign(payload, process.env.SECRET_KEY, {
          expiresIn: expTime,
          audience: process.env.JWT_AUD,
        });

        let finalData = {
          user: {
            name: userLogin.name,
            email: userLogin.email,
          },

          token: token,
          expireTime: expTime,
        };
        return res.status(201).json(finalData);
      }
    } else {
      return res.status(400).json({ error: "Invalid Credidential" });
    }
  } catch (error) {
    console.log("login form ", error);
  }
});


router.post("/profile", async (req, res) => {
  const { cookie } = req.body;
  try {
    const decodedToken = jwt.verify(cookie, process.env.SECRET_KEY);
    console.log(cookie);
    console.log(decodedToken);
    const userId = decodedToken.id;
    const userDetails = await User.findOne({ _id: userId });
    return res.status(201).json(userDetails);
  } catch (error) {
    console.error("Error Profile section", error);
  }
});

router.post("/cart", async (req, res) => {
  const { name, category, price, quantity, cookie } = req.body;
  const cartItem = {
    name: name,
    category: category,
    price: price,
    quantity: quantity,
  };
  try {
    const payload = jwt.verify(cookie, process.env.SECRET_KEY);
    const userId = payload.id;
    console.log("user id is", userId);

    const user = await User.findOne({ _id: userId });
    await User.updateOne({ _id: userId }, { $push: { cart: cartItem } });
    res.status(200).json({ message: "Cart item added successfully" });
  } catch (error) {
    console.log("cart error", error);
  }
});
router.post("/cart/data", async (req, res) => {
  const { cookie } = req.body;
  try {
    const decodedToken = jwt.verify(cookie, process.env.SECRET_KEY);
    console.log(cookie);
    console.log(decodedToken);
    const userId = decodedToken.id;
    const userDetails = await User.findOne({ _id: userId });
    return res.status(201).json(userDetails.cart);
  } catch (error) {
    console.error("Error Profile section", error);
  }
});

module.exports = router;
