import React, { useCallback, useEffect } from "react";
import TopHeader from "../components/TopHeader";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();

  const getUser = useCallback(async () => {
    let userExist = await localStorage.getItem("BandhejHub");
    if (userExist) {
      navigate("/");
    }
  }, [navigate]);
  useEffect(() => {
    getUser();
  }, [getUser]);
  return (
    <>
      <TopHeader />
      <Navbar />
      <LoginForm />
      <Footer />
    </>
  );
}

export default Login;
