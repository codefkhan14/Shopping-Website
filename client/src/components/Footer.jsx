import React from "react";
import "../style/FooterStyle.css";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { PiInstagramLogo } from "react-icons/pi";
import { RiFacebookFill } from "react-icons/ri";
import { FaWhatsapp, FaYoutube, FaTwitter } from "react-icons/fa";
function Footer() {
  return (
    <>
      <footer id="footer">
        <div className="content">
          <div className="left box">
            <div className="upper">
              <div className="topic">About us</div>
              <p>
                Bandhej hub is a Biggest Manufacturer of bandhani products in
                india, it sells 1000-2000 products per day with good customers
                feedback and our customer's satisfaction rate is 99%.{" "}
              </p>
            </div>
            <div className="lower">
              <div className="topic">Contact us</div>
              <div className="phone">
                <span>
                  {" "}
                  <BsFillTelephoneFill /> &nbsp; +91-7740930250
                </span>
              </div>
              <div className="email">
                <a href="mailto:bandhejhub@gmail.com">
                  <span>
                    {" "}
                    <MdEmail /> &nbsp; bandhejhub@gmail.com
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div className="middle box">
            <div className="topic">Categories</div>
            <div>
              <a href="#">Dupattas</a>
            </div>
            <div>
              <a href="#">Saree</a>
            </div>
            <div>
              <a href="#">Lehengas</a>
            </div>
            <div>
              <a href="#">Suits</a>
            </div>
            <div>
              <a href="#">Ghatchola Saree</a>
            </div>
            <div>
              <a href="#">Marwad Pila Chunni</a>
            </div>

            <form action=""></form>
          </div>
          <div className="right box">
            <div className="topic">Subscribe us</div>
            <form action="#">
              <input type="text" placeholder="Enter email address" />
              <input type="submit" name="" value="Send" />
              <div className="media-icons">
                <a href="https://www.instagram.com/bandhej_hub/">
                  <i>
                    <PiInstagramLogo />
                  </i>
                </a>
                <a href="https://www.facebook.com/bandhejhub14/">
                  <i>
                    <RiFacebookFill />
                  </i>
                </a>
                <a href="https://www.youtube.com/channel/UCXArGaNnUU_bJGYZJb-WlAA">
                  <i>
                    <FaYoutube />
                  </i>
                </a>
                <a href="https://wa.me/7740930250">
                  <i>
                    <FaWhatsapp />
                  </i>
                </a>
                <a href="">
                  <i>
                    <FaTwitter />
                  </i>
                </a>
              </div>
            </form>
          </div>
        </div>

        <p id="cright">
          Copyright © 2023 All rights reserved | Bandhej Hub Sikar
        </p>
      </footer>
    </>
  );
}

export default Footer;
