import React, { useCallback, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Accountc from '../components/Account'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom';

function Account() {
   const navigate = useNavigate();
  
  const getUser = useCallback(async () => {
    let userExist = await localStorage.getItem("BandhejHub");
    if (!userExist) {
      navigate("/");
    }
  }, [navigate]);
  useEffect(() => {
    getUser();
  }, [getUser]);
  return (
    <>
    <Navbar/>
    <Accountc/>
    <Footer/>
      
    </>
  )
}

export default Account
