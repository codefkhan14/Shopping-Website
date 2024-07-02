import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { TfiHeart } from "react-icons/tfi";
import { PiShoppingCart } from "react-icons/pi";
import { UserContext } from "../context/userContext";

const ProductCard = ({ item, index, openModal }) => {
  const { currency } = useContext(UserContext);

  const truncateText = (text, maxWords) => {
    if (text.lenth < maxWords) return text;
    return text.slice(0, maxWords) + "...";
  };
  const CurrencyPrice = (price) => {
    if (currency === "USD $") return `$${(price / 84 + 4).toFixed(2)} USD`;
    else if (currency === "EUR €")
      return `€${(price / 90 + 3.8).toFixed(2)} EUR`;
    else if (currency === "GBP £")
      return `£${(price / 106 + 3.5).toFixed(2)} GBP`;
    else return `Rs.${price}.00`;
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
            <p className="product-price">
              {CurrencyPrice(item?.price)}
            </p>
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
