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
import backend_ref from "./components/Backend_ref";
function App() {
  console.log(backend_ref);
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:category/:name/:id" element={<BuyPage />} />
            <Route path="/account/login" element={<Login />} />
            <Route path="/account/register" element={<SignUp />} />
            <Route path="/account" element={<Account />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/:category" element={<FullProductRoute />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;
