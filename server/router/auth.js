const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());
// const authenticate = require('../middleware/authenticate')
const querystring = require("querystring");
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

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "Email already exist" });
    }
    const user = new User({ name: name, email: email, password: password });
    await user.save();
    res.status(201).json({ message: "User register succefully" });
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userLogin = await User.findOne({ email: email });
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      if (!isMatch) {
        return res.status(400).json({ error: "Invalid credidential" });
      } else {

        let expTime = "30 days";
        console.log(userLogin._id);
        let payload = { id: userLogin._id };
        let token = jwt.sign(payload, process.env.SECRET_KEY, {
          expiresIn: expTime,
          audience: process.env.JWT_AUD,
        });
        // console.log(this._id);
        // res.cookie('myCo', token, {
        //   maxAge: 3600000, // Cookie expires in 1 hour
        //   httpOnly: true
        //    // Cookie is accessible only through HTTP, not JavaScript
        //   // Other optional cookie settings can be added here
        // });
        // res.send('Cookie set!');
        //  res.cookie('bandhejcookie', token)
        // res.cookie('token', token, { path: '/login', httpOnly: true, maxAge: 3600000 }); // This sets a cookie named "token" with a one-hour expiration

        //  res.json("goi succss");
       
        let finalData = {
          data: {
            name: userLogin.name,
            email: userLogin.email,
          },

          token: token,
          expireTime: expTime,
        };

        // console.log(userLogin._id.toString());

        return res.status(201).json(finalData);
        // return res.status(201).json("login succesully");
      }
    } else {
      return res.status(400).json({ error: "Invalid credidential" });
    }
  } catch (error) {
    console.log(error);
  }
});
router.post('/profile',async (req,res)=>{
  const { cookie } = req.body;
  try {
    const decodedToken = jwt.verify(cookie, process.env.SECRET_KEY);
    const userId = decodedToken.id;
    const userDetails = await User.findOne({ _id: userId });
  return res.status(201).json(userDetails);
  } catch (error) {
    console.error('Error decoding token:', error);
  }


})





module.exports = router;
