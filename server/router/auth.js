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
        userId: user?._id,
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
      },

      token: token,
      expireTime: expTime,
    };
    return res.status(201).json(finalData);
  } catch (error) {
    return res.status(401).json(error);
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
        let payload = { id: userLogin._id };
        let token = jwt.sign(payload, process.env.SECRET_KEY, {
          expiresIn: expTime,
          audience: process.env.JWT_AUD,
        });

        let finalData = {
          user: {
            userId: userLogin?._id,
            name: userLogin?.name,
            email: userLogin?.email,
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
    return res.status(401).json(error);
  }
});

router.post("/user/addtocart", async (req, res) => {
  const { name, category, price, quantity, userId } = req.body;
  const cartItem = {
    name: name,
    category: category,
    price: price,
    quantity: quantity,
  };

  try {
    await User.updateOne({ _id: userId }, { $push: { cart: cartItem } });
    let response = {
      message: "Cart item added successfully",
      result: {
        name: name,
        category: category,
        price: price,
        quantity: quantity,
      },
    };
    res.status(200).json(response);
  } catch (error) {
    return res.status(401).json(error);
  }
});
router.post("/user/cart", async (req, res) => {
  const { userId } = req.body;
  try {
    const userDetails = await User.findOne({ _id: userId });

    return res.status(201).json(userDetails.cart);
  } catch (error) {
    return res.status(401).json(error);
  }
});

module.exports = router;
