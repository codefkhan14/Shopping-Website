import React, { useContext, useEffect, useState } from "react";
import "../style/SellingPageStyle.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { TfiHeart } from "react-icons/tfi";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { UserContext } from "../context/userContext";
import { ADD_TO_CART, GET_PRODUCT_BY_ID } from "./Apis";

function SellingPage() {
  const { itemCount, setItemCount, userInfo } = useContext(UserContext);
  const { productId } = useParams();
  const { id } = useParams();

  const productSHowImg = productId[productId.length - 1];
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const [pproductId, setProductId] = useState("");
  let itemCountInc = itemCount;
  const toastOption = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

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
      image: showImageUrl || productInfo.images[0]?.imgUrl,
      quantity: quantity,
      userId: userInfo?.user?.userId,
      itemId: id,
      productId: productId,
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
    setProductId(imgurl?.productId);
    setShowImageUrl(imgurl?.imgUrl);
    navigate(
      `/${productInfo?.category}/${productInfo?.name.replace(/\s+/g, "-")}/${
        productInfo?._id
      }/${imgurl?.productId}`
    );
  };
  const [option, setOption] = useState("productDetails");
  const handleOption = (option) => {
    setOption(option);
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
              {productInfo?.images.map((imageUrl, index) => (
                <div key={index} onClick={() => handleShowImg(imageUrl)}>
                  <img
                    className={
                      imageUrl?.imgUrl === showImageUrl ? "active" : ""
                    }
                    src={imageUrl?.imgUrl}
                    alt={productInfo?.name}
                  />
                </div>
              ))}
            </div>

            <div className="product-image-containerr-top-show-img">
              <img
                src={
                  showImageUrl
                    ? showImageUrl
                    : productInfo?.images[productSHowImg]?.imgUrl
                }
                alt={productInfo?.name}
                className="product-imagee"
              />
            </div>
          </div>

          <div className="product-detailss">
            <p className="product-details-stock">In Stock</p>
            <h2>{productInfo?.name}</h2>
            <p className="product-details-price">
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
            <div className="single-product-options">
              <p
                // className="active"
                className={option === "productDetails" ? "active" : ""}
                onClick={() => handleOption("productDetails")}
              >
                Product Details
              </p>
              <p
                className={option === "description" ? "active" : ""}
                onClick={() => handleOption("description")}
              >
                Description
              </p>
              <p
                className={option === "reviews" ? "active" : ""}
                onClick={() => handleOption("reviews")}
              >
                Reviews
              </p>
              <p
                className={option === "returnPolicy" ? "active" : ""}
                onClick={() => handleOption("returnPolicy")}
              >
                {" "}
                Return Policy
              </p>
            </div>
            {option === "productDetails" && (
              <div>
                {productInfo?.details?.productDetails?.map((item, index) => {
                  return (
                    <p className="product-details-desc" key={index}>
                      {item}
                    </p>
                  );
                })}
              </div>
            )}
            {option === "description" && (
              <p className="product-details-desc">
                {productInfo?.details?.description}
              </p>
            )}
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
}

export default SellingPage;
