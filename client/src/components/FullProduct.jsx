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
  const handleFilterSelection = (filter) => {
    console.log("Selected filter:", filter);
    // Here you can perform any additional actions based on the selected filter
  };
  return (
    <>
      <div>
        <div className="fullproduct-container">
          <div className="product-details-top-container-navigation">
            <p>
              <Link to="/">Home</Link> |{" "}
              <Link to={`/${category}`}>{category}</Link>
              {}
            </p>
          </div>

          <div className="fullproduct-heading">
            <div>
              <h2>{category}</h2>
            </div>

            <div className="fullproduct-heading-filter-icons">
              <div>
                <p onClick={() => setShowFilter(!showFilter)}>
                  {" "}
                  <i>
                    <FiFilter />
                  </i>
                  Filter
                </p>
                {showFilter && (
                  <div className="fullproduct-filter-section">
                    <div onClick={() => handleFilterSelection("top-trending")}>
                      Top Trending
                    </div>
                    <div onClick={() => handleFilterSelection("top-trending")}>
                      Best Selling
                    </div>
                    <div onClick={() => handleFilterSelection("top-trending")}>
                      Offered Item
                    </div>
                    <div onClick={() => handleFilterSelection("best-selling")}>
                      Best Selling
                    </div>
                    <div onClick={() => handleFilterSelection("offered-item")}>
                      Offered Item
                    </div>
                    <div onClick={() => handleFilterSelection("offered-item")}>
                      Offered Item
                    </div>
                  </div>
                )}
              </div>

              <div>
                <p onClick={() => setShowSort(!showSort)}>
                  <i>
                    <TbArrowsSort />
                  </i>
                  Sort
                </p>
                {showSort && (
                  <div className="fullproduct-sort-section">
                    <div onClick={() => handleFilterSelection("top-trending")}>
                      Price, low to hight
                    </div>
                    <div onClick={() => handleFilterSelection("best-selling")}>
                      Price, high to low
                    </div>
                    <div onClick={() => handleFilterSelection("offered-item")}>
                      Alphabetically, A-Z
                    </div>
                    <div onClick={() => handleFilterSelection("offered-item")}>
                      Alphabetically, Z-A
                    </div>
                    <div onClick={() => handleFilterSelection("offered-item")}>
                      Date, old to new
                    </div>
                    <div onClick={() => handleFilterSelection("offered-item")}>
                      Date, new to old
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* {showFilter && (
            <div className="fullproduct-filter-section">
              <div>Top Trending</div>
              <div>Best Selling</div>
              <div>Offered Item</div>
              <div>Best Selling</div>
              <div>Best Selling</div>
            </div>
          )} */}

          {/* {showSort && (
            <div className="fullproduct-sort-section">
              <div>Price, low to hight</div>
              <div>Price, high to low</div>
              <div>Alphabetically, A-Z</div>
              <div>Alphabetically, Z-A</div>
              <div>Date, old to new</div>
              <div>Date, new to old</div>
            </div>
          )} */}

          <div className="fullproduct-list-container">
            <div className="fullproduct-list">
              {FullProductData?.map((item, index) => (
                <div className="fullproduct-card" key={index}>
                  <i className="fullproduct-whitelist-icon">
                    <TfiHeart />
                  </i>
                  <i className="fullproduct-addcart-icon">
                    <PiShoppingCart />
                  </i>
                  <i className="fullproduct-view-icon">
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
                        src={item?.image[0]}
                        alt={item?.name}
                        className="fullproduct-image"
                      />
                    </Link>
                  </div>
                  <div className="fullproduct-info">
                    <span>{item?.category}</span>
                    <p className="productinfop1">{item?.name}</p>
                    <p className="fullproduct-price">₹{item?.price}.00</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FullProduct;
