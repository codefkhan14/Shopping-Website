import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { API_BASE_URL } from "../config";

function SignUpForm() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

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

  // const registerapi = "https://bandhejhub.onrender.com/register";
  const SubmitForm = async (e) => {
    e.preventDefault();
    const { name, password, cpassword, email } = user;
    if (!name || !email || !password || !cpassword) {
      toast.error("Please fill all field", toastOption);
      return false;
    } else if (password !== cpassword) {
      toast.error("Password and Confirm Password Must be Same.", toastOption);
      return false;
    }

    try {
      const response = await axios.post("http://localhost:5000/register", user);
      console.log(response.data);
      window.alert("User Reigster Successfull");
      toast.success("Register Successfully", toastOption);
      navigate("/account/login");
    } catch (err) {
      console.log("sign up frontend", err);
      toast.error(err.response.data.error, toastOption);
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
            value={user.name}
            onChange={handleInput}
          />
          <input
            type="email"
            placeholder="Email ID"
            className="loginforminput"
            name="email"
            value={user.email}
            onChange={handleInput}
          />
          <input
            type="password"
            placeholder="Password"
            className="loginforminput"
            name="password"
            value={user.password}
            onChange={handleInput}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="loginforminput"
            name="cpassword"
            value={user.cpassword}
            onChange={handleInput}
          />

          <a href="" className="fogpass">
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
