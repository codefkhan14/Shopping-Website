const User = require("../model/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const register = async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    const userExist = await User.findOne({ email: email });
    if (phone.length > 10)
      return res.status(400).json({ error: "Invalid Mobail Number" });

    if (userExist) {
      return res.status(409).json({ error: "User already exist" });
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
    return res
      .status(201)
      .json({ message: "User created successfully", finalData });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

const login = async (req, res) => {
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
            phone: userLogin?.phone,
          },

          token: token,
          expireTime: expTime,
        };
        return res
          .status(201)
          .json({ message: "User login successfully", finalData });
      }
    } else {
      return res.status(400).json({ error: "Invalid Credidential" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};
const checkMailFgPass = async (req, res) => {
  const { email } = req.body;
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(202).json("User Available");
    } else {
      return res.status(400).json({ error: "User not exist" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};
const ForgPass = async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { $set: { password: hashedPassword } },
      { new: true }
    );

    return res
      .status(201)
      .json({ message: "Password Changed Successfully", updatedUser });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};
module.exports = { register, login, checkMailFgPass, ForgPass };
