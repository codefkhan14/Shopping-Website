import React, { useCallback, useEffect } from "react";
import TopHeader from "../components/TopHeader";
import Navbar from "../components/Navbar";
import ForgotPassword from "../components/ForgotPassword";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const FogotePasswordRoute = () => {
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
    <div>
      <TopHeader />
      <Navbar />
      <ForgotPassword />
      <Footer />
    </div>
  );
};

export default FogotePasswordRoute;
