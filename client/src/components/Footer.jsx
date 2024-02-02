import React from "react";
import "../style/Footer.css";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { PiInstagramLogo } from "react-icons/pi";
import { RiFacebookFill } from "react-icons/ri";
import { FaWhatsapp, FaYoutube, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <>
      <div className="footer">
        <div className="footer-content">
          <div className="footer-left-section footer-section">
            <div className="upper">
              <div className="topic">𝕭𝖆𝖓𝖉𝖍𝖊𝖏 𝕳𝖚𝖇</div>
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

          <div className="footer-middle-section footer-section">
            <div className="topic">Quick Shop</div>
            <div>
              <Link to="/Top-Trending">Top Trending</Link>
            </div>
            <div>
              <Link to="/Recomanded">Recomanded Item</Link>
            </div>
            <div>
              <Link to="/">Super Sale</Link>
            </div>
            <div>
              <Link to="/Saree">Saree</Link>
            </div>
            <div>
              <Link to="/Dupatta">Dupatta</Link>
            </div>
            <div>
              <Link to="/Lehanga">Lehengas</Link>
            </div>
            <div>
              <Link to="/Dress">Dress</Link>
            </div>

            <form></form>
          </div>
          <div className="footer-right-section footer-section">
            <div className="topic">Subscribe us</div>
            <form>
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
                <a href="/">
                  <i>
                    <FaTwitter />
                  </i>
                </a>
              </div>
            </form>
          </div>
        </div>

        <div className="footer-copy-right">
          <p>Copyright © 2023 All rights reserved | Bandhej Hub Sikar</p>
        </div>
      </div>
    </>
  );
}

export default Footer;
