import React, { useState } from "react";
import "../style/SellingPageStyle.css";
import { useParams } from "react-router-dom";
import { TfiHeart } from "react-icons/tfi";
function SellingPage({
  allProductsData,
  sareeData,
  dupattaData,
  dressData,
  lehangaData,
}) {
  const [quantity, setQuantity] = useState(1);
  let { id } = useParams();
  let product = allProductsData.find((p) => p.id === parseInt(id));
  if (!product) product = sareeData.find((p) => p.id === parseInt(id));
  if (!product) product = dupattaData.find((p) => p.id === parseInt(id));
  if (!product) product = dressData.find((p) => p.id === parseInt(id));
  if (!product) product = lehangaData.find((p) => p.id === parseInt(id));
  if (!product) {
    return <div>Product not found.</div>;
  }

  const handlePurchase = () => {
    alert(`You purchased ${product.name} for $${product.price}`);
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

  return (
    <>
      <div className="product-details-containerr">
        <div className="product-image-containerr">
          <img
            src={product.image}
            alt={product.name}
            className="product-imagee"
          />
        </div>

        <div className="product-detailss">
          <p>Home/{product.category}</p>
          <p>In Stock</p>
          <h2>{product.name}</h2>
          <p>
            Price: ${product.price} (<i>Including all texes</i>)
          </p>

          <div className="quantity-container">
            <label>Quantity:</label>
            <div className="quantity-control">
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
          <div className="add-icons-detaiils">
            <i>
              {" "}
              <TfiHeart /> Add to Wishlist
            </i>
          </div>
          <button className="purchase-button" onClick={handlePurchase}>
            Buy it now
          </button>
          <button className="purchase-button" onClick={handlePurchase}>
            add cart
          </button>
          <hr />
          <h3>Discription</h3>
          <p>{product.description}</p>
        </div>
      </div>
    </>
  );
}

export default SellingPage;
