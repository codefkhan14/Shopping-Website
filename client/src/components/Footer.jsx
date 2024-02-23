import React from "react";
import "../style/Footer.css";
import { PiInstagramLogo } from "react-icons/pi";
import { IoLocationOutline } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import { SlPhone } from "react-icons/sl";
import { RiFacebookFill } from "react-icons/ri";
import { FaWhatsapp, FaYoutube, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <>
      <div className="footer">
        <div className="footer-content">
          <div className="footer-left-section footer-section">
            <div>
              <h2>𝕭𝖆𝖓𝖉𝖍𝖊𝖏 𝕳𝖚𝖇</h2>
            </div>

            <div>
              <p>
                Bandhej hub is a Biggest Manufacturer of bandhani products in
                india, it sells 1000-2000 products per day with good customers
                feedback and our customer's satisfaction rate is 99%. india, it
                sells 1000-2000 products per day with good customers feedback
                and our customer's satisfaction rate is 99%.{" "}
              </p>
            </div>
          </div>

          <div className="footer-middle-section footer-section">
            <div>
              <h2>Quick Shop</h2>
            </div>

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
          </div>

          <div className="footer-middle-section footer-middle2-section footer-section">
            <div>
              <h2>Quick Shop</h2>
            </div>

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
          </div>

          <div className="footer-right-section footer-section">
            <div>
              <h2>Get in Touch</h2>
            </div>

            <div>
              <i>
                <IoLocationOutline />
              </i>
              <span> 168, Sarat Base Road, Kolkata - 332001</span>
            </div>
            <div>
              <i>
                <AiOutlineMail />
              </i>
              <span>customercare@gmail.com</span>
            </div>
            <div>
              <i>
                <SlPhone />
              </i>
              <span>+91-7740930250</span>
            </div>

            <div className="footer-right-section-media-icons">
              <div>
                <a href="https://www.instagram.com/bandhej_hub/">
                  <i>
                    <PiInstagramLogo />
                  </i>
                </a>
              </div>
              <div>
                <a href="https://www.facebook.com/bandhejhub14/">
                  <i>
                    <RiFacebookFill />
                  </i>
                </a>
              </div>
              <div>
                <a href="https://www.youtube.com/channel/UCXArGaNnUU_bJGYZJb-WlAA">
                  <i>
                    <FaYoutube />
                  </i>
                </a>
              </div>
              <div>
                <a href="https://wa.me/7740930250">
                  <i>
                    <FaWhatsapp />
                  </i>
                </a>
              </div>
              <div>
                <a href="/">
                  <i>
                    <FaTwitter />
                  </i>
                </a>
              </div>
            </div>
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
