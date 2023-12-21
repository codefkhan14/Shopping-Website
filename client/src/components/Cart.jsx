import React, { useContext } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import "../style/Cart.css";
import { UserContext } from "../context/userContext";

const Cart = () => {
  const { cartData } = useContext(UserContext);

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
