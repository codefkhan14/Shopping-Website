import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { API_BASE_URL } from "../config";

function Account() {
  const navigate = useNavigate();
  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  // const profileapi = "http://localhost:5000/profile";
  useEffect(()=>{
    const myCookie = localStorage.getItem("token");
    console.log("cookie in accoutn page ",myCookie);
    if(myCookie){
      axios
      .post('https://bandhejhub.onrender.com/profile', { cookie: myCookie })
      .then((response) => {
        console.log(response.data);
        setUserName(response.data.name);
        setUserEmail(response.data.email);
      })
      .catch((error) => {
        console.log("Profile Frontend error", error);
      });
    }
    else{
     console.log("coookie not find");
    }
  },[])
 
 
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
