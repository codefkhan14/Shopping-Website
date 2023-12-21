import React, { useContext, useEffect, useState } from "react";
import "../style/NavbarStyle.css";
import { TfiSearch, TfiHeart } from "react-icons/tfi";
import { CiMenuFries } from "react-icons/ci";
import { PiShoppingCart } from "react-icons/pi";
import { PiUserCircleLight } from "react-icons/pi";
import { RxCross1 } from "react-icons/rx";

import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";

function Navbar() {
  const { itemCount } = useContext(UserContext);
  const [stickyClass, setStickyClass] = useState("");
  const [Menuclick, setMenuclick] = useState(true);
  const [catclick, setCatclick] = useState(false);
  const [clickMenu, setClickMenu] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);
    return () => window.removeEventListener("scroll", stickNavbar);
  }, []);
  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight > 120
        ? setStickyClass("sticky-nav-come")
        : setStickyClass("");
    }
  };

  const ClickMenuIcons = () => {
    setClickMenu(!clickMenu);
  };
  const menuClick = () => {
    setCatclick(false);
    setMenuclick(true);
  };
  const categoryClick = () => {
    setCatclick(true);
    setMenuclick(false);
  };

  return (
    <>
      <div className={`navbar-item ${stickyClass}`}>
        <div className="menu">
          <i onClick={ClickMenuIcons}>
            <CiMenuFries />
          </i>
          <ul className={clickMenu ? "nav-menu active" : "nav-menu"}>
            <li onClick={ClickMenuIcons}>
              <RxCross1 />
            </li>
            <li className="btn-list-navbar">
              <button onClick={menuClick}>Menu</button>
              <button onClick={categoryClick}>Categories</button>
            </li>
            <ul className={Menuclick ? "menu-list" : "menu-list active"}>
              <li>
                <a href="">All items</a>
              </li>
              <li>
                <a href="">New items</a>
              </li>
              <li>
                <a href="">Offered Item</a>
              </li>
              <li>
                <a href="">Super Sale</a>
              </li>
              <li>
                <a href="">Bloge</a>
              </li>
              <li>
                <a href="">Search</a>
              </li>
              <li>
                <a href="">Whitelist</a>
              </li>
              <li>
                <a href="">Login/Register</a>
              </li>
              <li>
                <a href="">Cart</a>
              </li>

              <li>
                <p>
                  Need Help? <br /> +9177409456 <br />
                  customercare@gmail.com
                </p>
              </li>
            </ul>
            <ul className={catclick ? "category-list" : "category-list active"}>
              <li>
                <a href="">Saree</a>
              </li>
              <li>
                <a href="">Dupatta</a>
              </li>
              <li>
                <a href="">Suit</a>
              </li>
              <li>
                <a href="">Lehanga</a>
              </li>
              <li>
                <a href="">Kurtis</a>
              </li>
              <li>
                <a href="">All Products</a>
              </li>
            </ul>
          </ul>
        </div>
        <div className="brand-name">
          {/* <a href="">𝓑𝓪𝓷𝓭𝓱𝓮𝓳 𝓱𝓾𝓫</a> */}
          <Link to="/">𝕭𝖆𝖓𝖉𝖍𝖊𝖏 𝕳𝖚𝖇</Link>
        </div>
        <div className="nav-items">
          <ul>
            <li className="nav-item-search">
              <a href="">
                <TfiSearch />
              </a>
              {/* <span>Search</span> */}
            </li>
            <li className="nav-item-user">
              <Link to="/account/login" style={{ fontSize: "25px" }}>
                <PiUserCircleLight />
              </Link>
              {/* <span>User</span> */}
            </li>
            <li className="nav-item-whitlist">
              <a href="">
                <TfiHeart />
              </a>
              {/* <span>Whitelist</span> */}
            </li>
            <li className="nav-item-cart">
              <Link to="/cart">
                <PiShoppingCart />
              </Link>
              <span>{itemCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
