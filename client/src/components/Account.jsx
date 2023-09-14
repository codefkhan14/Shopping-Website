import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
function Account(props) {
  // console.log(user);
  const navigate = useNavigate();
  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  const myCookie = localStorage.getItem("token");
  axios
    .post("http://localhost:5000/profile", { cookie: myCookie })
    .then((response) => {
      console.log(response.data);
      setUserName(response.data.name);
      setUserEmail(response.data.email);
    })
    .catch((error) => {
      console.log("account error", error);
    });
  return (
    <>
      <Link>
        <li>Account</li>
      </Link>
      <li>username : {userName}</li>
      <li>email : {userEmail}</li>
      <li>
        <button onClick={handleSignOut}>Sign Out</button>
      </li>
    </>
  );
}

export default Account;
