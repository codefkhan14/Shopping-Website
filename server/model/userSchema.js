const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  cart: [
    {
      name: String,
      quantity: Number,
      price: Number,
      category: String,
      image: String,
      productId: String,
      itemId: String,
    },
  ],
  orders: [
    {
      orderId: {
        type: String,
        require: true,
      },
      date: {
        type: Date,
        require: true,
      },
      orderDetails: {
        shippingDetails: {
          name: {
            type: String,
            require: true,
          },
          phone: {
            type: String,
            require: true,
          },
          address: {
            type: String,
            require: true,
          },
          city: {
            type: String,
            require: true,
          },
          state: {
            type: String,
            require: true,
          },
          pincode: {
            type: String,
            require: true,
          },
        },

        prices: {
          subtotal: {
            type: Number,
            require: true,
          },
          shipping: {
            type: Number,
            require: true,
          },
          tax: {
            type: Number,
            require: true,
          },

          total: {
            type: Number,
            require: true,
          },
        },
      },

      productDetails: [
        {
          name: String,
          quantity: Number,
          price: Number,
          category: String,
          image: String,
          productId: String,
          itemId: String,
        },
      ],
    },
  ],
});
//    hashing password
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

const User = mongoose.model("REGISTER", userSchema);
module.exports = User;
