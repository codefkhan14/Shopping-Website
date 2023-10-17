import React, { useContext, useState } from "react";
import "../style/LoginForm.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import noteContext from '../context/Context';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Account from "./Account";
// import { API_BASE_URL } from "../config";

function LoginForm() {
  const {itemCount, setItemCount} = useContext(noteContext)

  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const isUserSignedIn = !!localStorage.getItem("token");

  const toastOption = {
    password: "buttom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleInput = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const loginapi = "http://localhost:5000/login";
  const SubmitForm = async (e) => {
    e.preventDefault();
    const { password, email } = user;
    if (!email || !password) {
      toast.error("Please fill all field", toastOption);
      return false;
    }

    try {
      const response = await axios.post(loginapi, user);
      const token = response.data.token;
      navigate("/");
      setItemCount(itemCount)

      localStorage.setItem("token", token);
      toast.success("Login Successfully", toastOption);
      
    } catch (err) {
      console.log("login from frontend", err);
      toast.error(err.response.data.error, toastOption);
    }

    return true;
  };

  return (
    <>
      {isUserSignedIn ? (
        <>
          <Account />
        </>
      ) : (
        <div>
          <div className="loginform">
            <h3>WELCOME TO THE BANDHEJ HUB</h3>
            <form className="lform" method="POST" onSubmit={SubmitForm}>
              <input
                type="email"
                placeholder="Enter email ID"
                className="loginforminput"
                name="email"
                value={user.email}
                onChange={handleInput}
              />
              <input
                type="password"
                placeholder="Enter password"
                className="loginforminput"
                name="password"
                value={user.password}
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
      )}
    </>
  );
}

export default LoginForm;
