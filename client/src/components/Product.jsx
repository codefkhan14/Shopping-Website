import React from "react";
import "../style/ProductStyle.css";
import { Link } from "react-router-dom";
import "../style/ProductListStyle.css";

import { TfiHeart, TfiEye } from "react-icons/tfi";
import { PiShoppingCart } from "react-icons/pi";

function Product({ heading, allProductsData, summary }) {
  console.log(allProductsData);
  return (
    <div>
      <div className="app-container">
        <h2>{heading}</h2>
        <p>{summary}</p>

        <div className="product-list-container">
          <div className="product-list">
          {allProductsData?.slice(0, 6).map((item, index) => (
              <div className="product-card" key={index}>
                <i className="whitelist-icon">
                  <TfiHeart />
                </i>
                <i className="addcart-icon">
                  <PiShoppingCart />
                </i>
                <i className="view-icon">
                  <TfiEye />
                </i>

                <div className="product-image-container">
                  <Link
                    to={`/${item?.category}/${item?.name.replace(
                      /\s+/g,
                      "-"
                    )}/${item?._id}`}
                  >
                    <img
                      src={item?.image}
                      alt={item?.name}
                      className="product-image"
                    />
                  </Link>
                </div>
                <div className="product-info">
                  <span>{item?.category}</span>
                  <p className="productinfop1">{item?.name}</p>
                  <p className="product-price">₹{item?.price}.00</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Link to={allProductsData?.[0]?.category || '/'}>
          <button className="view-btn">View all →</button>
        </Link>
      </div>
    </div>
  ); 
}

export default Product;
