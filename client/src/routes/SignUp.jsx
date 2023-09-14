import React from 'react'
import TopHeader from "../components/TopHeader";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SignUpForm from "../components/SignUpForm";
function SignUp() {
  return (
    <div>
        <TopHeader />
      <Navbar />
      <SignUpForm/>
      <Footer />
    </div>
  )
}

export default SignUp
