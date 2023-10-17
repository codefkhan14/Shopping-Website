import React from "react";
import "../style/ProductStyle.css";
import ProductList from "./ProductList";

function Product({ heading, allProductsData, summary }) {
  return (
    <div>
      <div className="app-container">
        <h2>{heading}</h2>
        <p>{summary}</p>
        <ProductList allProductsData={allProductsData} />
        <a href="ViewSaree.html">
          <button className="view-btn">View all →</button>
        </a>
      </div>
    </div>
  );
}

export default Product;
