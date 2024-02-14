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
  // ADD TO CART
  const handleAddToCart = async () => {
    const { category, price, name } = productInfo;
    const addToCartData = {
      name: name,
      category: category,
      price: price,
      image: showImageUrl,
      image: showImageUrl || productInfo.image[0],
      quantity: quantity,
      userId: userInfo?.user?.userId,
      productId:id
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

  const [showImageUrl, setShowImageUrl] = useState("");
  const handleShowImg = (imgurl) => {
    setShowImageUrl(imgurl);
  };

  return (
    <>
      <div className="product-details-top-container">
        <div className="product-details-top-container-navigation">
          <p>
            <Link to="/">Home</Link> |{" "}
            <Link to={`/${productInfo?.category}`}>
              {productInfo?.category}
            </Link>{" "}
            | {productInfo?.name}
            {}
          </p>
        </div>

        <div className="product-details-containerr">
          <div className="product-image-containerr">
            <div className="product-image-containerr-more-colors">
              {productInfo?.image.map((imageUrl, index) => (
                <div key={index} onClick={() => handleShowImg(imageUrl)}>
                  <img
                    className={imageUrl === showImageUrl ? "active" : ""}
                    src={imageUrl}
                    alt={productInfo?.name}
                  />
                </div>
              ))}
            </div>

            <div className="product-image-containerr-top-show-img">
              <img
                src={showImageUrl ? showImageUrl : productInfo?.image[0]}
                alt={productInfo?.name}
                className="product-imagee"
              />
            </div>
          </div>

          <div className="product-detailss">
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
            <button className="purchase-button">
              <a
                href="https://wa.me/7740930250"
                target="_blank"
                rel="noreferrer"
              >
                Buy now
              </a>
            </button>
            <button className="purchase-button" onClick={handleAddToCart}>
              add cart
            </button>
            <div className="single-product-hashline"></div>
            <h3>Discription</h3>
            <p>{productInfo?.description}</p>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
}

export default SellingPage;
