import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import BuyPage from "./routes/BuyPage";
import axios from "axios";
import Login from "./routes/Login";
import SignUp from "./routes/SignUp";
import Account from "./routes/Account";

function App() {
  const [allProductsData, setAllProductsData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/allProductdata/")
      .then((response) => {
        setAllProductsData(response.data);
      })
      .catch((err) => {
        console.log("erro aa", err);
      });
  });

  const [sareeData, setSareeData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/sareedata/")
      .then((response) => {
        setSareeData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const [dupattaData, setDupattaData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/dupattadata/")
      .then((response) => {
        setDupattaData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const [dressData, setDressData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/dressdata/")
      .then((response) => {
        setDressData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  const [lehangaData, setLehangaData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/lehangadata/")
      .then((response) => {
        setLehangaData(response.data);
      })
      .catch((err) => {
        console.log(err);
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
