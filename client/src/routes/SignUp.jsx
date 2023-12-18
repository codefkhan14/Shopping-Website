import React, { useCallback, useEffect } from "react";
import TopHeader from "../components/TopHeader";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SignUpForm from "../components/SignUpForm";
import { useNavigate } from "react-router-dom";
function SignUp() {
  const navigate = useNavigate();

  const getUser = useCallback(async () => {
    let userExist = await localStorage.getItem("BandhejHub");
    if (userExist) {
      navigate("/account");
    }
  }, [navigate]);
  useEffect(() => {
    getUser();
  }, [getUser]);
  return (
    <div>
      <TopHeader />
      <Navbar />
      <SignUpForm />
      <Footer />
    </div>
  );
}

export default SignUp;
