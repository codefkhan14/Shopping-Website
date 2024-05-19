const Product = require("../model/productSchema");

const addProdcut = async (req, res) => {
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
      product: {
        name: name,
        category: category,
        price: price,
        details: details,
        images: images,
        tag: tag,
      },
    };
    return res
      .status(201)
      .json({ message: "Add product successfull", finalData });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};
module.exports = { addProdcut };
