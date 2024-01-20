import React from "react";
import "../style/TopHeaderStyle.css";
import { PiInstagramLogo } from "react-icons/pi";
import { RiFacebookFill } from "react-icons/ri";
import { FaWhatsapp, FaYoutube, FaTwitter } from "react-icons/fa";
function TopHeader() {
  return (
    <>
      <section className="navtopbanner">
        <div className="navtopbanner1">
          <p>Bandhej Hub A Collections Of Bandhani Items</p>
        </div>
        <div className="navtopbanner2">
          <p>Up To 20% Off For Re-sellers </p>
        </div>

        <div className="navtopbanner3">
          <p>Follow Us :</p>
          <a href="https://www.instagram.com/bandhej_hub/">
            <PiInstagramLogo />
          </a>
          <a href="https://www.facebook.com/bandhejhub14/">
            <RiFacebookFill />
          </a>
          <a href="https://www.youtube.com/channel/UCXArGaNnUU_bJGYZJb-WlAA">
            <FaYoutube />
          </a>
          <a href="https://wa.me/7740930250">
            <FaWhatsapp />
          </a>
          <a href="/">
            <FaTwitter />
          </a>
        </div>
      </section>
    </>
  );
}

export default TopHeader;
