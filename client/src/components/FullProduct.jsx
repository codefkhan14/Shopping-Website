import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GET_PRODUCT_BY_CATEGORY, GET_PRODUCT_BY_TAG } from "./Apis";
import axios from "axios";
import { TfiHeart } from "react-icons/tfi";
import "../style/FullProduct.css";
import ProductCard from "./ProductCard";

const FullProduct = () => {
  const { category } = useParams();

  const [sortOption, setSortOption] = useState("Featured");
  const [FullProductData, setFullProductData] = useState(null);

  const [page, setPage] = useState(1);
  const [noofPages, setNoofPages] = useState(null);
  const pageIncrease = () => {
    if (page !== noofPages) setPage((page) => page + 1);
  };
  const pageDecrease = () => {
    if (page !== 1) setPage((page) => page - 1);
  };
  const handleSetPage = (number) => {
    setPage(number);
  };

  const sortProducts = (data) => {
    switch (sortOption) {
      case "Featured":
        return [...data];
      case "priceAccending":
        return [...data].sort((a, b) => a.price - b.price);
      case "priceDecending":
        return [...data].sort((a, b) => b.price - a.price);
      case "AtoZ":
        return [...data].sort((a, b) => a.name.localeCompare(b.name));
      case "ZtoA":
        return [...data].sort((a, b) => b.name.localeCompare(a.name));
      case "NewToOld":
        return [...data].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      case "OldToNew":
        return [...data].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      default:
        return data;
    }
  };

  const FetchFullProductList = useCallback(async () => {
    try {
      let response;
      if (category === "Top-Trending" || category === "Recomanded") {
        const modifiedString = category.replace(/-/g, " ");
        response = await axios.post(GET_PRODUCT_BY_TAG, {
          tag: modifiedString,
          page: page,
        });
      } else {
        response = await axios.post(GET_PRODUCT_BY_CATEGORY, {
          category,
          page,
        });
      }
      setFullProductData(sortProducts(response.data.products));

      setNoofPages(response.data.no_of_pages);
    } catch (error) {
      console.log("Error fetching product data:", error);
    }
  }, [page, category, sortOption]);

  useEffect(() => {
    FetchFullProductList();
  }, [FetchFullProductList, sortOption]);

  const handleSortSelection = (e) => {
    setSortOption(e.target.value);
  };

  // Modal
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

          <div className="fullproduct-heading" id="pageTop">
            <div>
              <h2>{category}</h2>
            </div>

            <div className="fullproduct-heading-filter-icons">
              {/* <div>
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
              </div> */}

              <select name="" id="" onChange={handleSortSelection}>
                <option value="Featured">Featured</option>
                <option value="priceAccending">Price, low to hight</option>
                <option value="priceDecending"> Price, high to low</option>
                <option value="AtoZ">Alphabetically, A-Z</option>
                <option value="ZtoA">Alphabetically, Z-A</option>
                <option value="NewToOld"> Date, new to old</option>
                <option value="OldToNew"> Date, old to new</option>
              </select>
            </div>
          </div>

          <div className="fullproduct-list-container">
            <div className="fullproduct-list">
              {FullProductData?.map((item, index) => (
                <ProductCard key={index} item={item} openModal={openModal} />
              ))}
            </div>
          </div>

          <div className="full-product-list-pages">
            <div onClick={pageDecrease}>
              <a href="#pageTop">Prev</a>
            </div>
            {[...Array(noofPages).keys()].map((num) => (
              <div
                onClick={() => handleSetPage(num + 1)}
                key={num + 1}
                className={page === num + 1 ? "active" : ""}
              >
                <a href="#pageTop" className="full-product-active">
                  {num + 1}
                </a>
              </div>
            ))}
            <div onClick={pageIncrease}>
              <a href="#pageTop">Next</a>
            </div>
          </div>
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
                        <div
                          key={index}
                          onClick={() => handleShowImg(imageUrl)}
                        >
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
    </>
  );
};

export default FullProduct;
