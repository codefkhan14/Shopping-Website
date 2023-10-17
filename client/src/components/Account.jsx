import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import noteContext from '../context/Context';

import { useNavigate } from "react-router-dom";
import "../style/Account.css";
function Account() {
  const {setItemCount} = useContext(noteContext)

  const navigate = useNavigate();
  const handleSignOut = () => {
   setItemCount(0);
    localStorage.removeItem("token");
    navigate("/");
  };

  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  // const profileapi = "http://localhost:5000/profile";
  useEffect(() => {
    const myCookie = localStorage.getItem("token");
    if (myCookie) {
      axios
        .post("http://localhost:5000/profile", { cookie: myCookie })
        .then((response) => {
          console.log(response.data);
          setUserName(response.data.name);
          setUserEmail(response.data.email);
        })
        .catch((error) => {
          console.log("Profile Frontend error", error);
        });
    } else {
      console.log("coookie not find");
    }
  }, []);

  return (
    <div className="account-info">
      <ul>
        <li><b>Account Information</b></li>
        <hr />
        <li> <b>Name</b> : {userName}</li>
        <hr />
        <li> <b>Email Address</b> : {userEmail}</li>
        <hr />
        <li> <b>Your Address</b> : ward no 2 sikar,rajasthan</li>
        <hr />
        
          <button onClick={handleSignOut}>Sign Out</button>
      </ul>
    </div>
  );
}

export default Account;
