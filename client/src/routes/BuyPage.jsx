import React from "react";
import TopHeader from "../components/TopHeader";
import Navbar from "../components/Navbar";
import SellingPage from "../components/SellingPage";
import Product from "../components/Product";
import Footer from "../components/Footer";
function BuyPage({
  allProductsData,
  sareeData,
  dupattaData,
  dressData,
  lehangaData,
})

{
  
  return (
    <>
      <TopHeader />
      <Navbar />
      <SellingPage
        allProductsData={allProductsData}
        sareeData={sareeData}
        dupattaData={dupattaData}
        dressData={dressData}
        lehangaData={lehangaData}
      />
      <Product heading="Recomonded Products" />

      <Footer />
    </>
  );
}

export default BuyPage;
