const User = require("../model/userSchema");

const getAllOrder = async (req, res) => {
  const { userId } = req.body;
  try {
    const userDetails = await User.findOne({ _id: userId });
    return res.status(200).json(userDetails.orders);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = { getAllOrder };
