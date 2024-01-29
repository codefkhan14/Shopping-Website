// FullProduct.js

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GET_PRODUCT_BY_CATEGORY, GET_PRODUCT_BY_TAG } from "./Apis";
import axios from "axios";
import { FiFilter } from "react-icons/fi";
import { TbArrowsSort } from "react-icons/tb";
import { TfiHeart, TfiEye } from "react-icons/tfi";
import { PiShoppingCart } from "react-icons/pi";
import "../style/FullProduct.css";

const FullProduct = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const { category } = useParams();
  const [FullProductData, setFullProductData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response; 
        if (category === "Top-Trending" || category === "Recomanded") {
          const modifiedString = category.replace(/-/g, " ");
          response = await axios.post(GET_PRODUCT_BY_TAG, {
            tag: modifiedString,
          });
        } else {
          response = await axios.post(GET_PRODUCT_BY_CATEGORY, { category });
        }
        setFullProductData(response.data);
      } catch (error) {
        console.log("Error fetching product data:", error);
      }
    };
    fetchData();
  }, [category]);

  return (
    <div className="fullproduct-container">
      <div className="fullproduct">
        <div className="fullproduct-list-container">
          <div className="fullproduct-heading">
            <div className="fullproduct-heading-heading">
              <p>
                <Link to="/">Home</Link> / {category}
              </p>
              <h2>Bandhani Sarees</h2>
            </div>
            <div className="fullproduct-heading-filter-icons">
              <p onClick={() => setShowFilter(!showFilter)}>
                {" "}
                <i>
                  <FiFilter />
                </i>
                Filter
              </p>
              <p onClick={() => setShowSort(!showSort)}>
                <i>
                  <TbArrowsSort />
                </i>
                Sort
              </p>
            </div>
          </div>
          {/* Filter section */}
          {showFilter && (
            <div className="fullproduct-filter-section">
              {/* Add your filter options here */}
              <div>Top Trending</div>
              <div>Best Selling</div>
              <div>Offered Item</div>
              <div>Best Selling</div>
              <div>Best Selling</div>
            </div>
          )}
          {showSort && (
            <div className="fullproduct-sort-section">
              {/* Add your filter options here */}
              <div>Price, low to hight</div>
              <div>Price, high to low</div>
              <div>Alphabetically, A-Z</div>
              <div>Alphabetically, Z-A</div>
              <div>Date, old to new</div>
              <div>Date, new to old</div>
            </div>
          )}
          <div className="fullproduct-list">
            {FullProductData?.map((item, index) => (
              <div className="fullproduct-card" key={index}>
                <i className="whitelist-icon">
                  <TfiHeart />
                </i>
                <i className="addcart-icon">
                  <PiShoppingCart />
                </i>
                <i className="view-icon">
                  <TfiEye />
                </i>
                <div className="fullproduct-image-container">
                  <Link
                    to={`/${item?.category}/${item?.name.replace(
                      /\s+/g,
                      "-"
                    )}/${item?._id}`}
                  >
                    <img
                      src={item?.image}
                      alt={item?.name}
                      className="fullproduct-image"
                    />
                  </Link>
                </div>
                <div className="fullproduct-info">
                  <span>{item?.category}</span>
                  <p className="fullproductinfop1">{item?.name}</p>
                  <p className="fullproduct-price">₹{item?.price}.00</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullProduct;
