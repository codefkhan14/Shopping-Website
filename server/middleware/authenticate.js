const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

const Authenticate = async (req, res, next) => {
  try {
   const token = req.cookies.bandhejlogindata;
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    const rootUser = await User.findOne({
      _id: verifyToken._id,
      "tokens.token": token
    });

    console.log(rootUser);
    if (!rootUser) throw new Error("user not found");
    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;
    next();
  } catch (error) {
    res.status(401).send("no token provide unauthorized");
    console.log(error);
  }
};
module.exports = Authenticate;
