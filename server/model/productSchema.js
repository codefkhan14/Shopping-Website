const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  images: [
    {
      productId: String,
      imgUrl: String,
    },
  ],
  tag: {
    type: String,
    require: true,
  },
});

const Product = mongoose.model("PRODUCT", productSchema);
module.exports = Product;
