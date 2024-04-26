const express = require("express");
const router = express.Router();
require("../database/connection");

router.post("/admin/addproduct", async (req, res) => {
  const { name, category, price, details, images, tag } = req.body;
  try {
    const product = new Product({
      name: name,
      category: category,
      price: price,
      details: details,
      images: images,
      tag: tag,
    });
    await product.save();
    let finalData = {
      message: "add product successfull",

      product: {
        name: name,
        category: category,
        price: price,
        details: details,
        images: images,
        tag: tag,
      },
    };
    return res.status(201).json(finalData);
  } catch (error) {
    return res.status(401).json(error);
  }
});

module.exports = router;
