import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { USER_REGISTER } from "./Apis";

function SignUpForm() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
  });

  const toastOption = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleInput = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const SubmitForm = async (e) => {
    e.preventDefault();
    if (userData?.password !== userData?.cpassword) {
      toast.error("Password and Confirm Password Must be Same.", toastOption);
      return false;
    }

    try {
      const response = await axios.post(USER_REGISTER, userData);
      window.alert("User Reigster Successfull");
      localStorage.setItem("BandhejHub", JSON.stringify(response.data));
      window.location.href = "/"; // Redirect using anchor tag
    } catch (error) {
      toast.error(error.response.data.error, toastOption);
    }
    return true;
  };
  return (
    <>
      <div className="loginform">
        <h3>WELCOME TO THE BANDHEJ HUB</h3>
        <form className="lform" method="POST" onSubmit={SubmitForm}>
          <input
            type="text"
            placeholder="Full Name"
            className="loginforminput"
            name="name"
            value={userData?.name}
            required
            onChange={handleInput}
          />
          <input
            type="email"
            placeholder="Email ID"
            className="loginforminput"
            name="email"
            value={userData?.email}
            required
            onChange={handleInput}
          />
          <input
            type="text"
            placeholder="Phone"
            className="loginforminput"
            name="phone"
            value={userData?.phone}
            required
            onChange={handleInput}
          />
          <input
            type="password"
            placeholder="Password"
            className="loginforminput"
            name="password"
            value={userData?.password}
            required
            onChange={handleInput}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="loginforminput"
            name="cpassword"
            value={userData?.cpassword}
            required
            onChange={handleInput}
          />

          <a href="/" className="fogpass">
            Forgot Password?
          </a>

          <input
            type="submit"
            name="button"
            className="formbtn"
            value="Sign Up"
          />
          <span>
            Already have an account ?{" "}
            <Link to="/account/login" className="formspana">
              Login
            </Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default SignUpForm;
