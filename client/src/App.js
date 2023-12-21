import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import BuyPage from "./routes/BuyPage";
import axios from "axios";
import Login from "./routes/Login";
import SignUp from "./routes/SignUp";
import Account from "./routes/Account";
import Cart from "./routes/Cart";
import backend_ref from "./components/Backend_ref";
import { UserProvider } from "./context/userContext";
function App() {
  const allProductapi = backend_ref + "/api/allProductdata/";
  const sareeapi = backend_ref + "/api/sareedata/";
  const dupattaapi = backend_ref + "/api/dupattadata/";
  const dressapi = backend_ref + "/api/dressdata/";
  const lehangaapi = backend_ref + "/api/lehangadata/";

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
  }, []);

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
  }, []);

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
  }, []);

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
  }, []);
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
  }, []);
  return (
    <>
      <UserProvider>
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
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;
