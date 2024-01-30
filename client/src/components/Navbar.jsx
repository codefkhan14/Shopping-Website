import React, { useCallback, useContext, useEffect, useState } from "react";
import "../style/NavbarStyle.css";
import { TfiSearch, TfiHeart } from "react-icons/tfi";
import { CiMenuFries } from "react-icons/ci";
import { PiShoppingCart } from "react-icons/pi";
import { PiUserCircleLight } from "react-icons/pi";
import { RxCross1 } from "react-icons/rx";

import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

function Navbar() {
  let userExist = localStorage.getItem("BandhejHub");

  const navigate = useNavigate();
  const { itemCount } = useContext(UserContext);
  const [stickyClass, setStickyClass] = useState("");
  //  FOR MENU ICON CLICK HIDE AND SHOW
  const [clickMenu, setClickMenu] = useState(false);
  const [listChange, setListChange] = useState(true);

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

  const clickList = (value) => {
    if (value === "/") navigate("/");
    else {
      navigate(`/${value}`);
    }

    setClickMenu(!clickMenu);
  };

  const ListChange = (value) => {
    if (value === "1") setListChange(true);
    else if (value === "2") setListChange(false);
  };

  const [userLogin, setUserLogin] = useState(false);
  const getUser = useCallback(async () => {
    let userExist = await localStorage.getItem("BandhejHub");
    if (userExist) {
      setUserLogin(true);
    }
  }, []);
  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <>
      <div className={`navbar-item ${stickyClass}`}>
        <div className="navside-bar">
          <div className="navbar-menu-icon">
            <i onClick={ClickMenuIcons}>
              <CiMenuFries />
            </i>
          </div>

          <div className={clickMenu ? "nav-menu active" : "nav-menu"}>
            <div onClick={ClickMenuIcons} className="navside-bar-menu-list">
              <i>
                <RxCross1 />
              </i>
            </div>

            <div className="btn-list-navbar navside-bar-menu-list">
              <button onClick={() => ListChange("1")}>Menu</button>
              <button onClick={() => ListChange("2")}>Categories</button>
            </div>

            {listChange ? (
              <div className="menu-list">
                <div
                  className="navside-bar-menu-list"
                  onClick={() => clickList("/")}
                >
                  All Products
                </div>
                <div className="navside-bar-menu-list">Offered Item</div>
                <div
                  className="navside-bar-menu-list"
                  onClick={() => clickList("Top-Trending")}
                >
                  Top Trending Item
                </div>
                <div
                  className="navside-bar-menu-list"
                  onClick={() => clickList("Recomanded")}
                >
                  Recommanded Item
                </div>
                <div className="navside-bar-menu-list">Super Sale</div>
                <div className="navside-bar-menu-list">Blogs</div>
                <div className="navside-bar-menu-list">Search</div>
                <div className="navside-bar-menu-list">Wishlist</div>
                <div
                  className="navside-bar-menu-list"
                  onClick={() => clickList("cart")}
                >
                  Cart
                </div>
                {userLogin ? (
                  <div
                    className="navside-bar-menu-list"
                    onClick={() => clickList("account")}
                  >
                    Account
                  </div>
                ) : (
                  <div
                    className="navside-bar-menu-list"
                    onClick={() => clickList("account/login")}
                  >
                    Login/Register
                  </div>
                )}
                <div
                  className="navside-bar-menu-list"
                  style={{ cursor: "auto" }}
                >
                  <p>
                    Need Help? <br /> +9177409456 <br />
                    customercare@gmail.com
                  </p>
                </div>
              </div>
            ) : (
              <div className="category-list">
                <div
                  className="navside-bar-menu-list"
                  onClick={() => clickList("/")}
                >
                  All Products
                </div>
                <div
                  className="navside-bar-menu-list"
                  onClick={() => clickList("Saree")}
                >
                  Saree
                </div>
                <div
                  className="navside-bar-menu-list"
                  onClick={() => clickList("Dupatta")}
                >
                  Dupatta
                </div>
                <div
                  className="navside-bar-menu-list"
                  onClick={() => clickList("Lehanga")}
                >
                  Lehanga
                </div>
                <div
                  className="navside-bar-menu-list"
                  onClick={() => clickList("Dress")}
                >
                  Dress
                </div>
              </div>
            )}
          </div>

        </div>

        <div className="brand-name">
          <Link to="/">𝕭𝖆𝖓𝖉𝖍𝖊𝖏 𝕳𝖚𝖇</Link>
        </div>

        <div className="nav-items">
          <ul>
            <li className="nav-item-search">
              <a href="/">
                <TfiSearch />
              </a>
            </li>
            <li className="nav-item-user">
              {userExist ? (
                <Link to="/account" style={{ fontSize: "25px" }}>
                  <PiUserCircleLight />
                </Link>
              ) : (
                <Link to="/account/login" style={{ fontSize: "25px" }}>
                  <PiUserCircleLight />
                </Link>
              )}
            </li>
            <li className="nav-item-whitlist">
              <a href="/">
                <TfiHeart />
              </a>
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
