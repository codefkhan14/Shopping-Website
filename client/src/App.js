import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import BuyPage from "./routes/BuyPage";
import axios from "axios";
import Login from "./routes/Login";
import SignUp from "./routes/SignUp";
import Account from "./routes/Account";
// import { API_BASE_URL } from "./config";
function App() {
  const allProductapi = "https://bandhejhub.onrender.com/api/allProductdata/";
  // const allProductapi = "http://localhost:5000/api/allProductdata/";
  // const allProductapi = `${API_BASE_URL}/api/allProductdata/`;
  // const sareeapi = `${API_BASE_URL}/api/sareedata/`;
  const sareeapi = "https://bandhejhub.onrender.com/api/sareedata/";
  // const dupattaapi = `${API_BASE_URL}/api/dupattadata/`;
  const dupattaapi = "https://bandhejhub.onrender.com/api/dupattadata/";
  // const dressapi = `${API_BASE_URL}/api/dressdata/`;
  const dressapi = "https://bandhejhub.onrender.com/api/dressdata/";
  // const lehangaapi = `${API_BASE_URL}/api/lehangadata/`;
  const lehangaapi = "https://bandhejhub.onrender.com/api/lehangadata/";
  
  const [allProductsData, setAllProductsData] = useState([]);
  useEffect(() => {
    axios
      .get(allProductapi)
      .then((response) => {
        setAllProductsData(response.data);
      })
      .catch((err) => {
        console.log("product error", err);
      });
  });

  const [sareeData, setSareeData] = useState([]);
  useEffect(() => {
    axios
      .get(sareeapi)
      .then((response) => {
        setSareeData(response.data);
      })
      .catch((err) => {
        console.log("product error", err);
      });
  });

  const [dupattaData, setDupattaData] = useState([]);
  useEffect(() => {
    axios
      .get(dupattaapi)
      .then((response) => {
        setDupattaData(response.data);
      })
      .catch((err) => {
        console.log("product error", err);
      });
  });

  const [dressData, setDressData] = useState([]);
  useEffect(() => {
    axios
      .get(dressapi)
      .then((response) => {
        setDressData(response.data);
      })
      .catch((err) => {
        console.log("product error", err);
      });
  });
  const [lehangaData, setLehangaData] = useState([]);
  useEffect(() => {
    axios
      .get(lehangaapi)
      .then((response) => {
        setLehangaData(response.data);
      })
      .catch((err) => {
        console.log("product error", err);
      });
  });
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                allProductsData={allProductsData}
                sareeData={sareeData}
                dupattaData={dupattaData}
                dressData={dressData}
                lehangaData={lehangaData}
              />
            }
          />
          <Route
            path="/product/:category/:id"
            element={
              <BuyPage
                allProductsData={allProductsData}
                sareeData={sareeData}
                dupattaData={dupattaData}
                dressData={dressData}
                lehangaData={lehangaData}
              />
            }
          />
          <Route path="/account/login" element={<Login />} />
          <Route path="/account/register" element={<SignUp />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
