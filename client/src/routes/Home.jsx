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

function Home() {
  const [topTrending, setTopTrending] = useState(null);
  useEffect(() => {
    const getProductByTag = async () => {
      try {
        const requestBody = {
          tag: "Top Trending",
        };
        const response = await axios.post(GET_PRODUCT_BY_TAG, requestBody);
        setTopTrending(response.data);
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
        setSareeData(response.data);
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
        setDupattaData(response.data);
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
        setDressData(response.data);
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
        setLehangaData(response.data);
      } catch (error) {
        console.log("Lehanga data error", error);
      }
    };
    getProductByLehanga();
  }, []);
  return (
    <>
      <TopHeader />
      <Navbar />
      <Product
        heading="Top Trending"
        summary="Collections Of Most Selling Items "
        allProductsData={topTrending}
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
