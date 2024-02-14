import React, { useState } from "react";
import "../style/LoginForm.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { USER_LOGIN } from "./Apis";
import { BiShow, BiHide } from "react-icons/bi";
function LoginForm() {
  const [buttonLoader, setButtonLoader] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
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
    setButtonLoader(true);

    try {
      const response = await axios.post(USER_LOGIN, userData);
      localStorage.setItem("BandhejHub", JSON.stringify(response.data));
      window.location.href = "/";
      setButtonLoader(false);
    } catch (error) {
      toast.error(error.response.data.error, toastOption);
      setButtonLoader(false);
    }

    return true;
  };

  return (
    <>
      <div>
        <div className="loginform">
          <h3>WELCOME TO THE BANDHEJ HUB</h3>
          <form className="lform" method="POST" onSubmit={SubmitForm}>
            <div>
              <input
                type="email"
                placeholder="Enter email ID"
                className="loginforminput"
                name="email"
                required
                value={userData?.email}
                onChange={handleInput}
              />
            </div>
            <div className="password-container">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Enter password"
                className="loginforminput"
                name="password"
                required
                value={userData?.password}
                onChange={handleInput}
              />
              <span
                className="password-toggle"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <BiHide size={16}/> : <BiShow size={16}/> }
              </span>
            </div>

            <Link to="/account/forgot-password" className="fogpass">
              Forgot Password?
            </Link>

            {buttonLoader ? (
              <>
                <button className="formbtn loading" disabled>
                  Loading...
                </button>
              </>
            ) : (
              <button className="formbtn">Sign up</button>
            )}

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
