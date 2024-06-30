const User = require("../model/userSchema");
const Product = require("../model/productSchema");
// return res.status(500).json({ message: "Internal server error" });

const addToCart = async (req, res) => {
  const { name, category, price, quantity, userId, image, productId, itemId } =
    req.body;
  const cartItem = {
    name: name,
    category: category,
    image: image,
    price: price,
    quantity: quantity,
    productId: productId,
    itemId: itemId,
  };
  try {
    const user = await User.findById(userId);
    const existingProductIndex = user.cart.findIndex(
      (item) => item.productId === productId
    );
    if (existingProductIndex !== -1) {
      user.cart[existingProductIndex].quantity += quantity;
      let response = {
        message: "Cart item added successfully",
        result: {
          name: name,
          category: category,
          price: price,
          quantity: quantity,
          image: image,
          productId: productId,
          itemId: itemId,
        },
      };

      await user.save();
      res
        .status(201)
        .json({ message: "Cart item added successfully", response });
    } else {
      await User.updateOne({ _id: userId }, { $push: { cart: cartItem } });
      let response = {
        message: "Cart item added successfully",
        result: {
          name: name,
          category: category,
          price: price,
          quantity: quantity,
          image: image,
          productId: cartItem.productId,
          itemId: itemId,
        },
      };

      await user.save();
      res
        .status(201)
        .json({ message: "Cart item added successfully", response });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const cart = async (req, res) => {
  const { userId } = req.body;
  try {
    const userDetails = await User.findOne({ _id: userId });

    return res.status(200).json(userDetails.cart);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
const removeFromCart = async (req, res) => {
  const { postId, userId } = req.body; // Assuming postId is used to identify the item to remove

  try {
    await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { cart: { _id: postId } } },
      { new: true }
    );

    res.status(200).json({ message: "Item has been removed from cart" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
const getProductByCategory = async (req, res) => {
  const { category, page } = req.body;
  try {
    const product = await Product.find({ category: category });
    if (page) {
      let n = product.length;
      let no_of_pages = 0;

      if (n % 12 == 0) no_of_pages = Math.floor(n / 12);
      else no_of_pages = Math.floor(n / 12) + 1;
      let x = 12 * (page - 1);
      let y = 12 * page - 1;
      if (no_of_pages == page) {
        let data = {
          products: product.slice(x, n),
          no_of_pages: no_of_pages,
          current_page: page,
        };
        return res.status(200).json(data);
      }
      let data = {
        products: product.slice(x, y + 1),
        no_of_pages: no_of_pages,
        current_page: page,
      };

      return res.status(200).json(data);
    } else {
      return res.status(200).json(product);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
const getProductByTag = async (req, res) => {
  const { tag, page } = req.body;
  try {
    const product = await Product.find({ tag: tag });
    if (page) {
      let n = product.length;
      let no_of_pages = 0;

      if (n % 12 == 0) no_of_pages = Math.floor(n / 12);
      else no_of_pages = Math.floor(n / 12) + 1;
      let x = 12 * (page - 1);
      let y = 12 * page - 1;
      if (no_of_pages == page) {
        let data = {
          products: product.slice(x, n),
          no_of_pages: no_of_pages,
          current_page: page,
        };

        return res.status(200).json(data);
      }
      let data = {
        products: product.slice(x, y + 1),
        no_of_pages: no_of_pages,
        current_page: page,
      };

      return res.status(200).json(data);
    } else {
      return res.status(200).json(product);
    }
  } catch (error) {
    return res.status(401).json(error);
  }
};
const getProductById = async (req, res) => {
  const { productId } = req.body;
  try {
    const product = await Product.findOne({ _id: productId });
    return res.status(200).json(product);
  } catch (error) {
    return res.status(401).json(error);
  }
};
module.exports = {
  addToCart,
  cart,
  removeFromCart,
  getProductByCategory,
  getProductByTag,
  getProductById,
};
