import React, { useEffect, useState } from "react";
import TopHeader from "../components/TopHeader";
import Navbar from "../components/Navbar";
import SellingPage from "../components/SellingPage";
import Product from "../components/Product";
import Footer from "../components/Footer";
import axios from "axios";
import { GET_PRODUCT_BY_TAG } from "../components/Apis";
function BuyPage() {
  const [recommended, setRecommended] = useState(null);
  useEffect(() => {
    const getProductByTag = async () => {
      try {
        const requestBody = {
          tag: "Recomanded",
        };
        const response = await axios.post(GET_PRODUCT_BY_TAG, requestBody);
        setRecommended(response.data);
      } catch (error) {
        console.log("setRecomonded data error", error);
      }
    };
    getProductByTag();
  }, []);
  return (
    <>
      <TopHeader />
      <Navbar />
      <SellingPage />
      <Product
        heading="Recomonded Products"
        summary="Collections Of Recommended Items"
        allProductsData={recommended}
        query="Recomanded"
      />
      <Footer />
    </>
  );
}

export default BuyPage;
