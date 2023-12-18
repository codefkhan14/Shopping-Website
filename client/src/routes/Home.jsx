import React from "react";
import TopHeader from "../components/TopHeader";
import Navbar from "../components/Navbar";
import Product from "../components/Product";
import Footer from "../components/Footer";

function Home({
  allProductsData,
  sareeData,
  dupattaData,
  dressData,
  lehangaData,
}) {
  return (
    <>
      <TopHeader />
      <Navbar />
      <Product
        heading="Top Trending"
        summary="Collections Of Most Selling Items "
        allProductsData={allProductsData}
      />
      <Product
        heading="bandhani saree"
        summary="Collections Of Top Trending Bandhani Saree With Different Colors"
        allProductsData={sareeData}
      />

      <Product
        heading="bandhani dupatta"
        summary="Collections Of Top Trending Bandhani dupatta With Different Colors"
        allProductsData={dupattaData}
      />

      <Product
        heading="bandhani dress"
        summary="Collections Of Top Trending Bandhani dress With Different Colors"
        allProductsData={dressData}
      />
      <Product
        heading="bandhani lehanga"
        summary="Collections Of Top Trending Bandhani lehanga With Different Colors"
        allProductsData={lehangaData}
      />

      <Footer />
    </>
  );
}

export default Home;
