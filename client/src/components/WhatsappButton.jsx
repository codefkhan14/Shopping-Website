import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import "../style/WhatsappButton.css";
const WhatsappButton = () => {
  return (
    <div>
      <a href="https://wa.me/7740930250" target="_blank" rel="noreferrer">
        <div className="whatsapp-button">
          <i>
            <FaWhatsapp />
          </i>
          <p>Chat now</p>
        </div>
      </a>
    </div>
  );
};

export default WhatsappButton;
