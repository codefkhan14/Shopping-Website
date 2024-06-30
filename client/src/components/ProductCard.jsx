import React from "react";
import { Link } from "react-router-dom";
import { TfiHeart } from "react-icons/tfi";
import { PiShoppingCart } from "react-icons/pi";

const ProductCard = ({ item, index, openModal }) => {
  const truncateText = (text, maxWords) => {
    if (text.lenth < maxWords) return text;
    return text.slice(0, maxWords) + "...";
  };
  return (
    <div className="product-card" key={index}>
      <p className="product-card-tag">Save 20%</p>

      <div className="product-image-container">
        <Link
          to={`/${item?.category}/${item?.name.replace(/\s+/g, "-")}/${
            item?._id
          }/${item?.images[0]?.productId}`}
        >
          <img
            src={item?.images[0]?.imgUrl}
            alt={item?.name}
            className="product-image"
          />
        </Link>
        <button className="addcart-icon" onClick={() => openModal(item)}>
          Quick view
        </button>
      </div>

      <div className="product-info">
        <div>
          <span>{item?.category}</span>
          <p className="productinfop1">{truncateText(item?.name, 25)}</p>
        </div>

        <div className="product-info-price-cart">
          <div>
            <p className="product-price">Rs.{item?.price}.00</p>
          </div>

          <div className="product-info-price-cart-buttons">
            <div>
              <button>
                <PiShoppingCart />
                {/* Add Car t */}
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
  );
};

export default ProductCard;
