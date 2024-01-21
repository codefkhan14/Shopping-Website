import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GET_PRODUCT_BY_CATEGORY, GET_PRODUCT_BY_TAG } from "./Apis";
import axios from "axios";
import { FiSearch } from "react-icons/fi";
import { BiFilterAlt } from "react-icons/bi";
import "../style/FullProduct.css";

import { TfiHeart, TfiEye } from "react-icons/tfi";
import { PiShoppingCart } from "react-icons/pi";
const FullProduct = () => {
  const { category } = useParams();
  // console.log(category);
  const [FullProductData, setFullProductData] = useState(null);
  useEffect(() => {
    if (category == "Top-Trending" || category == "Recomanded") {
      const originalString = category;
      const modifiedString = originalString.replace(/-/g, " ");
      const getFullProductData = async () => {
        try {
          const requestBody = {
            tag: modifiedString,
          };
          const response = await axios.post(GET_PRODUCT_BY_TAG, requestBody);
          setFullProductData(response.data);
        } catch (error) {
          console.log("saree data error", error);
        }
      };
      getFullProductData();
    } else {
      const getFullProductData = async () => {
        try {
          const requestBody = {
            category: category,
          };
          const response = await axios.post(
            GET_PRODUCT_BY_CATEGORY,
            requestBody
          );
          setFullProductData(response.data);
        } catch (error) {
          console.log("saree data error", error);
        }
      };
      getFullProductData();
    }
  }, [category]);
  return (
    <div className="fullproduct-container">
      <div className="fullproduct">
        <div className="fullproduct-list-filter-section">
          <div className="fullproduct-list-search">
            <div>
              <p>Keyword Search</p>
            </div>
            <div>
              <input type="text" placeholder="eg. Photgraphy,Delhi,JohnDoe" />
              <i>
                <FiSearch />
              </i>
            </div>
          </div>

          <div className="fullproduct-list-filter">
            <div style={{ textAlign: "center" }}>
              <p>
                <i>
                  <BiFilterAlt />
                </i>
                Filters
              </p>
            </div>

            <div style={{ marginTop: "30px" }}>
              <span>Profile</span>
              <input type="text" placeholder="eg. John Doe" />
            </div>
            <div style={{ marginTop: "30px" }}>
              <span>Category</span>
              <input type="text" placeholder="eg. Photgraphy" />
            </div>

            <div style={{ margin: "10px" }}>
              <span>Location</span>
              <input type="text" placeholder="eg. Delhi" />
            </div>
            <div style={{ margin: "10px" }}>
              <input type="submit" value="Search" />
            </div>
          </div>
        </div>

        <div className="fullproduct-list-container">
          <div className="fullproduct-heading">
            <p>{`Home / ${category}`}</p>
            <h2>Bandhani Sarees</h2>
          </div>
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
