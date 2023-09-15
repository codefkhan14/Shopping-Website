import React from "react";
import "../style/ProductListStyle.css";
import { Link } from "react-router-dom";
import { TfiHeart, TfiEye } from "react-icons/tfi";
import { PiShoppingCart } from "react-icons/pi";
const Product = ({ product }) => {
  return (
    <div className="product-card">
      <i className="whitelist-icon">
        {" "}
        <TfiHeart />
      </i>
      <i className="addcart-icon">
        {" "}
        <PiShoppingCart />
      </i>
      <i className="view-icon">
        {" "}
        <TfiEye />
      </i>

      <div className="product-image-container">
        <Link to={`/product/${product.category}/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />
        </Link>
      </div>
      <div className="product-info">
        <span>{product.category}</span>
        <p className="productinfop1">{product.name}</p>
        <p className="product-price">₹{product.price}.00</p>
      </div>
    </div>
  );
};

const ProductList = ({ allProductsData }) => {
  return (
    <div className="product-list-container">
      <div className="product-list">
        {allProductsData &&
          allProductsData.map((product, index) => (
            <Product key={index} product={product} />
          ))}
      </div>
    </div>
  );
};

export default ProductList;
