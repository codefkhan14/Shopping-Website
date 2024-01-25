import React, { useContext, useEffect, useState } from "react";
import "../style/SellingPageStyle.css";
import { Link, useParams } from "react-router-dom";
import { TfiHeart } from "react-icons/tfi";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { UserContext } from "../context/userContext";
import { ADD_TO_CART, GET_PRODUCT_BY_ID } from "./Apis";

function SellingPage() {
  const { itemCount, setItemCount, userInfo } = useContext(UserContext);
  const [quantity, setQuantity] = useState(1);
  let itemCountInc = itemCount;
  const toastOption = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const { id } = useParams();
  const [productInfo, setProductInfo] = useState(null);

  useEffect(() => {
    const getProductById = async () => {
      try {
        const requestBody = {
          productId: id,
        };
        const response = await axios.post(GET_PRODUCT_BY_ID, requestBody);
        setProductInfo(response.data);
      } catch (error) {
        console.log("top trending data error", error);
      }
    };
    getProductById();
  }, [id]);

  // PURCHASE PRODUCT
  const handlePurchase = async () => {
    alert(`You purchased ${productInfo?.name} for $${productInfo?.price}`);
  };
  // ADD TO CART
  const handleAddToCart = async () => {
    const { category, price, name, image } = productInfo;
    const addToCartData = {
      name: name,
      category: category,
      price: price,
      image: image,
      quantity: quantity,
      userId: userInfo?.user?.userId,
    };

    if (!userInfo) {
      toast.error("Plase Login for add product in cart", toastOption);
    } else {
      try {
        const response = await axios.post(ADD_TO_CART, addToCartData);
        toast.success(response.data.message, toastOption);
        itemCountInc++;
        setItemCount(itemCountInc);
      } catch (error) {
        console.log("add to cart error", error);
      }
    }
  };

  // QUANTITY SET UP
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    setQuantity(value);
  };

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  return (
    <>
      <div className="product-details-containerr">
        <div className="product-image-containerr">
          <img
            src={productInfo?.image}
            alt={productInfo?.name}
            className="product-imagee"
          />
        </div>

        <div className="product-detailss">
          <p>
            <Link to="/">Home</Link> / {productInfo?.category}
          </p>

          <p>In Stock</p>
          <h2>{productInfo?.name}</h2>
          <p>
            Price: ₹{productInfo?.price} (<i>Including all texes</i>)
          </p>

          <div className="quantity-container">
            <label>Quantity:</label>
            <div className="quantity-control">
              <button onClick={decreaseQuantity}>-</button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
              />
              <button onClick={increaseQuantity}>+</button>
            </div>
          </div>
          <div className="add-icons-detaiils">
            <i>
              <TfiHeart /> Add to Wishlist
            </i>
          </div>
          <button className="purchase-button" onClick={handlePurchase}>
            Buy it now
          </button>
          <button className="purchase-button" onClick={handleAddToCart}>
            add cart
          </button>
          <hr />
          <h3>Discription</h3>
          <p>{productInfo?.description}</p>
        </div>
      </div>

      <ToastContainer />
    </>
  );
}

export default SellingPage;
