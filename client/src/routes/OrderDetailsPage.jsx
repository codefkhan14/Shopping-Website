import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import OrderDetails from "../components/OrderDetails";
const OrderDetailsPage = () => {
  return (
    <div>
      <Navbar />
      <OrderDetails />
      <Footer />
    </div>
  );
};

export default OrderDetailsPage;
