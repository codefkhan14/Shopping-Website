import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../style/ProductListStyle.css";
import "../style/ProductStyle.css";
import "../style/ViewProductModal.css";

import { TfiHeart, TfiEye } from "react-icons/tfi";
import { PiShoppingCart } from "react-icons/pi";

function Product({ heading, allProductsData, summary, query }) {
  const truncateText = (text, maxWords) => {
    if (text.lenth < maxWords) return text;
    return text.slice(0, maxWords) + "...";
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
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

  const [showImg, setShowImg] = useState(null);
  const handleShowImg = (imgDetail) => {
    // console.log(imgUrl.imgUrl);
    setShowImg(imgDetail?.imgUrl);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [isModalOpen]);

  return (
    <div>
      <div className="allproduct-container">
        <div>
          <h2 className="allproduct-container-h2">{heading}</h2>
          <p className="allproduct-container-p">{summary}</p>
        </div>

        <div className="product-list-container">
          <div className="product-list">
            {allProductsData?.slice(0, 4).map((item, index) => (
              <div className="product-card" key={index}>
                <p className="product-card-tag">Save 20%</p>

                <div className="product-image-container">
                  <Link
                    to={`/${item?.category}/${item?.name.replace(
                      /\s+/g,
                      "-"
                    )}/${item?._id}/${item?.images[0]?.productId}`}
                  >
                    <img
                      src={item?.images[0]?.imgUrl}
                      alt={item?.name}
                      className="product-image"
                    />
                  </Link>
                  <button
                    className="addcart-icon"
                    onClick={() => openModal(item)}
                  >
                    Quick view
                  </button>
                </div>
                <div className="product-info">
                  <span>{item?.category}</span>
                  <p className="productinfop1">
                    {truncateText(item?.name, 30)}
                  </p>

                  <div className="product-info-price-cart">
                    <div>
                      <p className="product-price">Rs.{item?.price}.00</p>
                    </div>

                    <div className="product-info-price-cart-buttons">
                      <div>
                        <button>
                          {" "}
                          <i>
                            <PiShoppingCart />
                          </i>{" "}
                          Add Cart
                        </button>
                      </div>
                      <div>
                        <button>
                          <TfiHeart />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Link to={query ? `/${query.replace(/\s+/g, "-")}` : "/"}>
          <button className="view-btn">View all →</button>
        </Link>
      </div>

      {isModalOpen && (
        <div
          className="product-detail-modal"
          style={{ display: isModalOpen ? "block" : "none" }}
        >
          <div className="product-detail-modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>

            {selectedProduct && (
              <div className="modal-product-details-container">
                <div className="modal-product-image-container">
                  <div>
                    <img
                      src={
                        showImg ? showImg : selectedProduct?.images[0]?.imgUrl
                      }
                      alt={selectedProduct?.name}
                    />
                  </div>

                  <div>
                    <button>
                      <Link
                        to={`/${
                          selectedProduct?.category
                        }/${selectedProduct?.name.replace(/\s+/g, "-")}/${
                          selectedProduct?._id
                        }/${selectedProduct?.images[0]?.productId}`}
                      >
                        view more details
                      </Link>
                    </button>
                  </div>
                </div>

                <div className="modal-product-details">
                  <div className="modal-product-basic-details">
                    <p>In Stock</p>
                    <h2>{selectedProduct?.name}</h2>
                    <p>
                      Price: ₹{selectedProduct?.price} (
                      <i>Including all texes</i> )
                    </p>
                  </div>

                  <div className="modal-quantity-container">
                    <label>Quantity:</label>
                    <div className="modal-quantity-control">
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

                  <div className="modal-add-icons-detaiils">
                    <i>
                      <TfiHeart /> Add to Wishlist
                    </i>
                  </div>

                  <div className="modal-add-to-cart-button">
                    <button

                    // onClick={handleAddToCart}
                    >
                      add cart
                    </button>
                  </div>

                  <div className="modal-product-image-container-more-colors">
                    {selectedProduct?.images.map((imageUrl, index) => (
                      <div key={index} onClick={() => handleShowImg(imageUrl)}>
                        <img
                          className={
                            imageUrl?.imgUrl === showImg ? "active" : ""
                          }
                          src={imageUrl?.imgUrl}
                          alt={selectedProduct?.name}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Product;
