import React from "react";
import "../style/ServiceHome.css";
import { LiaShippingFastSolid } from "react-icons/lia";
import { IoMdHeartEmpty } from "react-icons/io";
import { HiOutlineArrowPathRoundedSquare } from "react-icons/hi2";

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
          <p>Free shipping on Orders above ₹999</p>
        </div>
      </div>
      <div className="service-sections">
        <div>
          <i>
            <IoMdHeartEmpty />
          </i>
        </div>
        <div>
          <h3>PROUDLY MADE IN INDIA</h3>
        </div>
        <div>
          <p>Crafted by local artisans and in-house karigars</p>
        </div>
      </div>
      <div className="service-sections">
        <div>
          <i>
            <HiOutlineArrowPathRoundedSquare />
          </i>
        </div>
        <div>
          <h3>EASY RETURN POLICY</h3>
        </div>
        <div>
          <p>Simple return and refund policy</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceHome;
