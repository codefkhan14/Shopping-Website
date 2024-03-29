const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();
const Razorpay = require("razorpay");

app.use(cookieParser());

const User = require("../model/userSchema");
const Product = require("../model/productSchema");
// const instance = require("../index.js");

require("../database/connection");

router.post("/payment", async (req, res) => {
  const { payment, receipt } = req.body;
  const instance = new Razorpay({
    key_id: "rzp_test_VIMg5R33m4Tjpx",
    key_secret: "FEKNXvr9Kr8xEfKckNIKh7jr",
  });
  const options = {
    amount: payment,
    currency: "INR",
    receipt: receipt,
  };
  try {
    const order = await instance.orders.create(options);
    console.log(order);
    res.status(200).json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/furkan", (req, res) => {
  res.send("how are you");
});

router.post("/user/register", async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    const userExist = await User.findOne({ email: email });
    if (phone.length > 10)
      return res.status(422).json({ error: "Invalid Mobail Number" });

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
            phone: userLogin?.phone,
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

router.post("/user/checkemail/forgotpassword", async (req, res) => {
  try {
    const { email } = req.body;
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(201).json("User Available");
    } else {
      return res.status(400).json({ error: "Email not exist" });
    }
  } catch (error) {
    return res.status(401).json(error);
  }
});

router.post("/user/forgotpassword", async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { $set: { password: hashedPassword } },
      { new: true }
    );

    return res.status(201).json(updatedUser);
  } catch (error) {
    return res.status(401).json(error);
  }
});

router.post("/user/addtocart", async (req, res) => {
  const { name, category, price, quantity, userId, image, productId, itemId } =
    req.body;

  console.log(productId);
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
      console.log(response);
      await user.save();
      res.status(200).json(response);
    } else {
      console.log("this is null", cartItem.productId);
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
      res.status(200).json(response);
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    return res.status(500).json({ message: "Internal server error" });
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

router.post("/user/removefromcart", async (req, res) => {
  const { postId, userId } = req.body; // Assuming postId is used to identify the item to remove

  try {
    await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { cart: { _id: postId } } },
      { new: true }
    );

    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    console.log("Error removing item from cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

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

router.post("/user/getproductbycategory", async (req, res) => {
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
    return res.status(401).json(error);
  }
});
router.post("/user/getproductbytag", async (req, res) => {
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
});
router.post("/user/getproductbyid", async (req, res) => {
  const { productId } = req.body;
  try {
    const product = await Product.findOne({ _id: productId });
    return res.status(200).json(product);
  } catch (error) {
    return res.status(401).json(error);
  }
});

// router.post('/user/updatename', async (req,res)=>{
//   try {
//     const { userId, name } = req.body;
//     // const { useraaaaaaaaaId, name } = req.body;
//     console.log(userId)

//     const updatedUser = await User.findByIdAndUpdate(userId, { name }, { new: true });

//     if (!updatedUser) {
//         return res.status(404).json({ error: 'User not found' });
//     }

//     res.json(updatedUser);
// } catch (e) {
//     console.error(e);
//     res.status(500).json({ error: e.message });
// }
// })
module.exports = router;
