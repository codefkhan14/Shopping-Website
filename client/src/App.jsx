import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import BuyPage from "./routes/BuyPage";
import Login from "./routes/Login";
import SignUp from "./routes/SignUp";
import Account from "./routes/Account";
import Cart from "./routes/Cart";
import { UserProvider } from "./context/userContext";
import FullProductRoute from "./routes/FullProductRoute";
import FogotePasswordRoute from "./routes/FogotePasswordRoute";
import ScrollTop from "./components/ScrollTop";
import Checkout from "./routes/Checkout";
function App() {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <ScrollTop />
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/:category/:name/:id" element={<BuyPage />} /> */}
            <Route
              path="/:category/:name/:id/:productId"
              element={<BuyPage />}
            />
            <Route path="/:category" element={<FullProductRoute />} />

            <Route path="/account/login" element={<Login />} />
            <Route path="/account/register" element={<SignUp />} />
            <Route
              path="/account/forgot-password"
              element={<FogotePasswordRoute />}
            />

            <Route path="/account" element={<Account />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;
