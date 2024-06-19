import React, { useEffect, useState } from "react";
import TopHeader from "../components/TopHeader";
import Navbar from "../components/Navbar";
import Product from "../components/Product";
import Footer from "../components/Footer";
import axios from "axios";
import {
  GET_PRODUCT_BY_TAG,
  GET_PRODUCT_BY_CATEGORY,
} from "../components/Apis";
import CarouselCmp from "../components/CarouselCmp";
import WhatsappButton from "../components/WhatsappButton";
import ServiceHome from "../components/ServiceHome";
function Home() {
  const [topTrending, setTopTrending] = useState(null);
  useEffect(() => {
    const getProductByTag = async () => {
      try {
        const requestBody = {
          tag: "Top Trending",
        };
        const response = await axios.post(GET_PRODUCT_BY_TAG, requestBody);
        setTopTrending(response.data.reverse());
      } catch (error) {
        console.log("top trending data error", error);
      }
    };
    getProductByTag();
  }, []);

  const [sareeData, setSareeData] = useState(null);
  useEffect(() => {
    const getProductBySaree = async () => {
      try {
        const requestBody = {
          category: "Saree",
        };
        const response = await axios.post(GET_PRODUCT_BY_CATEGORY, requestBody);
        setSareeData(response.data.reverse());
      } catch (error) {
        console.log("saree data error", error);
      }
    };
    getProductBySaree();
  }, []);
  const [dupattaData, setDupattaData] = useState(null);
  useEffect(() => {
    const getProductByDupatta = async () => {
      try {
        const requestBody = {
          category: "Dupatta",
        };
        const response = await axios.post(GET_PRODUCT_BY_CATEGORY, requestBody);
        setDupattaData(response.data.reverse());
      } catch (error) {
        console.log("dupatta data error", error);
      }
    };
    getProductByDupatta();
  }, []);

  const [dressData, setDressData] = useState(null);
  useEffect(() => {
    const getProductByDress = async () => {
      try {
        const requestBody = {
          category: "Dress",
        };
        const response = await axios.post(GET_PRODUCT_BY_CATEGORY, requestBody);
        setDressData(response.data.reverse());
      } catch (error) {
        console.log("dress data error", error);
      }
    };
    getProductByDress();
  }, []);
  const [lehangaData, setLehangaData] = useState(null);
  useEffect(() => {
    const getProductByLehanga = async () => {
      try {
        const requestBody = {
          category: "Lehanga",
        };
        const response = await axios.post(GET_PRODUCT_BY_CATEGORY, requestBody);
        setLehangaData(response.data.reverse());
      } catch (error) {
        console.log("Lehanga data error", error);
      }
    };
    getProductByLehanga();
  }, []);

  // const images = [
  //   "https://amounee.com/cdn/shop/files/product-banner_1800x.jpg?v=1652165756",
  //   "https://www.onlinebandhej.com/cdn/shop/files/Bandhani_Banner_New_copy_c4f909c7-047f-4f5b-bd1b-874c17059812_2048x.jpg?v=1704643022",
  //   "https://www.onlinebandhej.com/cdn/shop/files/Best_Seller_Bannenr_2048x.jpg?v=1704626298",
  //   // Add more image URLs as needed
  // ];

  return (
    <>
      <TopHeader />
      <Navbar />
      <CarouselCmp />
      <Product
        heading="Top Trending"
        summary="Collections Of Top Trending Items "
        allProductsData={topTrending}
        query="Top Trending"
      />
      <Product
        heading="bandhani saree"
        summary="Collections Of Bandhani Sarees"
        allProductsData={sareeData}
        query="Saree"
      />

      <Product
        heading="bandhani dupatta"
        summary="Collections Of Bandhani Dupattas"
        allProductsData={dupattaData}
        query="Dupatta"
      />

      <Product
        heading="bandhani dress"
        summary="Collections Of Bandhani Dresss"
        allProductsData={dressData}
        query="Dress"
      />
      <Product
        heading="bandhani lehanga"
        summary="Collections Of Bandhani Lehangas"
        allProductsData={lehangaData}
        query="Lehanga"
      />
      <ServiceHome />
      <Footer />
      <WhatsappButton />
    </>
  );
}

export default Home;
