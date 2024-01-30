import React, { useState } from "react";
import { USER_CHECK_EMAIL, USER_FORGOTPASSWORD } from "./Apis";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [buttonLoader, setButtonLoader] = useState(false);
  const [nextStep, setNextStep] = useState(false);
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
  const SubmitCheckEmail = async (e) => {
    e.preventDefault();
    setButtonLoader(true);

    try {
      await axios.post(USER_CHECK_EMAIL, userData);
      toast.success("Email fetch Successfully", toastOption);
      setNextStep(true);
      setButtonLoader(false);
    } catch (error) {
      console.log("show error");
      toast.error(error.response.data.error, toastOption);
      setButtonLoader(false);
    }

    return true;
  };
  const SubmitForgotPassword = async (e) => {
    e.preventDefault();
    setButtonLoader(true);

    try {
      await axios.post(USER_FORGOTPASSWORD, userData);
      toast.success("Password Change Successfully", toastOption);
      setButtonLoader(false);
      navigate("/account/login");
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
          {!nextStep ? (
            <form className="lform" method="POST" onSubmit={SubmitCheckEmail}>
              <input
                type="email"
                placeholder="Enter email ID"
                className="loginforminput"
                name="email"
                required
                value={userData?.email}
                onChange={handleInput}
              />

              {buttonLoader ? (
                <>
                  <button className="formbtn loading" disabled>
                    Loading...
                  </button>
                </>
              ) : (
                <button className="formbtn">Submit</button>
              )}
            </form>
          ) : (
            <form
              className="lform"
              method="POST"
              onSubmit={SubmitForgotPassword}
            >
              <input
                type="password"
                placeholder="Enter New password"
                className="loginforminput"
                name="password"
                required
                value={userData?.password}
                onChange={handleInput}
              />

              {buttonLoader ? (
                <>
                  <button className="formbtn loading" disabled>
                    Loading...
                  </button>
                </>
              ) : (
                <button className="formbtn">Submit</button>
              )}
            </form>
          )}
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default ForgotPassword;
