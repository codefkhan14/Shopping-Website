import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import "../style/Account.css";
import { UserContext } from "../context/userContext";
function Account() {
  const { userInfo, setItemCount } = useContext(UserContext);

  const navigate = useNavigate();
  const handleSignOut = () => {
    localStorage.removeItem("BandhejHub");
    navigate("/");
  };

  return (
    <div className="account-info">
      <ul>
        <li>
          <b>Account Information</b>
        </li>
        <hr />
        <li>
          {" "}
          <b>Name</b> : {userInfo?.user?.name}
        </li>
        <hr />
        <li>
          {" "}
          <b>Email Address</b> : {userInfo?.user?.email}
        </li>
        <hr />
        <li>
          {" "}
          <b>Phone</b> : {userInfo?.user?.phone}
        </li>
        <hr />
        <li>
          {" "}
          <b>Your Address</b> : ward no 2 sikar,rajasthan
        </li>
        <hr />

        <button onClick={handleSignOut}>Sign Out</button>
      </ul>
    </div>
  );
}

export default Account;
