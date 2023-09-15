import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

function Account() {
  const navigate = useNavigate();
  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  const profileapi = `${API_BASE_URL}/profile`;
  const myCookie = localStorage.getItem("token");
  axios
    .post(profileapi, { cookie: myCookie })
    .then((response) => {
      // console.log(response.data);
      setUserName(response.data.name);
      setUserEmail(response.data.email);
    })
    .catch((error) => {
      console.log("Profile Frontend error", error);
    });
  return (
    <>
      <li>Account</li>
      <li>username : {userName}</li>
      <li>email : {userEmail}</li>
      <li>
        <button onClick={handleSignOut}>Sign Out</button>
      </li>
    </>
  );
}

export default Account;
