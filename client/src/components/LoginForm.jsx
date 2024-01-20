import React, { useState } from "react";
import "../style/LoginForm.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { USER_LOGIN } from "./Apis";

function LoginForm() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
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

    try {
      const response = await axios.post(USER_LOGIN, userData);
      window.alert("User Login Successfull");
      localStorage.setItem("BandhejHub", JSON.stringify(response.data));
      window.location.href = "/";

      toast.success("Login Successfully", toastOption);
    } catch (error) {
      toast.error(error.response.data.error, toastOption);
    }

    return true;
  };

  return (
    <>
      <div>
        <div className="loginform">
          <h3>WELCOME TO THE BANDHEJ HUB</h3>
          <form className="lform" method="POST" onSubmit={SubmitForm}>
            <input
              type="email"
              placeholder="Enter email ID"
              className="loginforminput"
              name="email"
              required
              value={userData?.email}
              onChange={handleInput}
            />
            <input
              type="password"
              placeholder="Enter password"
              className="loginforminput"
              name="password"
              required
              value={userData?.password}
              onChange={handleInput}
            />

            <a href="" className="fogpass">
              Forgot Password?
            </a>

            <input
              type="submit"
              name="button"
              className="formbtn"
              value="Login"
            />
            <span>
              Don't have an account?{" "}
              <Link to="/account/register" className="formspana">
                Create account
              </Link>
            </span>
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default LoginForm;
