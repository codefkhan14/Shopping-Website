import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import noteContext from '../context/Context';

import { RiDeleteBin6Line } from "react-icons/ri";
import "../style/Cart.css";
import { UserContext } from "../context/userContext";
const Cart = () => {
   const {setItemCount} = useContext(UserContext);
  const [cartData, setCartData] = useState(null);
  useEffect(() => {
    const myCookie = localStorage.getItem("token");
    console.log("cookie in accoutn page ", myCookie);
    if (myCookie) {
      axios
        .post("http://localhost:5000/cart/data", { cookie: myCookie })
        .then((response) => {
          // console.log(response.data.length);
         setItemCount(response.data.length);
          setCartData(response.data);
        })
        .catch((error) => {
          console.log("Profile Frontend error", error);
        });
    } else {
      console.log("coookie not find");
    }
  }, []);
  return (
    <div className="cart-section">
      <h2>Your Cart</h2>
      <table>
        <thead>
          <tr>
            <th>ITEM</th>
            <th>CATEGORY</th>
            <th>PRICE</th>
            <th>QUANTITY</th>
            <th>SUBTOTAL</th>
            <th>REMOVE</th>
          </tr>
        </thead>
        <tbody>
          {cartData?.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{item.price * item.quantity}</td>
              <td>
                <RiDeleteBin6Line />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Cart;
