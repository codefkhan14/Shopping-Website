import React from "react";
import "../style/ServiceHome.css";
import { LiaShippingFastSolid } from "react-icons/lia";
import { GiShoppingCart } from "react-icons/gi";
import { RiCustomerServiceLine } from "react-icons/ri";

const ServiceHome = () => {
  return (
    <div className="service-section-home">
      <div className="service-sections">
        <div>
          <i>
            <LiaShippingFastSolid />
          </i>
        </div>
        <div>
          <h3>Free Shipping</h3>
        </div>
        <div>
          <p>For Orders Above $999</p>
        </div>
      </div>
      <div className="service-sections">
        <div>
          <i>
            <GiShoppingCart />
          </i>
        </div>
        <div>
          <h3>Free Shipping</h3>
        </div>
        <div>
          <p>For Orders Above $999</p>
        </div>
      </div>
      <div className="service-sections">
        <div>
          <i>
            <RiCustomerServiceLine />
          </i>
        </div>
        <div>
          <h3>Free Shipping</h3>
        </div>
        <div>
          <p>For Orders Above $999</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceHome;
