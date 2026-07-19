import React from "react";
import Collection from "./pages/Collection";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrders from "./pages/PlaceOrders";
import Orders from "./pages/Orders";

import NavBar from "./components/NavBar";
import ScrollToTop from "./components/ScrollToTop";

import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";

  

  import { ToastContainer, toast } from 'react-toastify';
import Verify from "./pages/Verify";

const App = () => {
  return (
    <div className="app-bg px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer
        position="bottom-right"
        autoClose={2600}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
        toastStyle={{
          borderRadius: '12px',
          fontFamily: 'Outfit, sans-serif',
          fontSize: '14px',
          boxShadow: '0 10px 30px rgba(24,24,27,0.10)',
          border: '1px solid #e2e5ec',
        }}
      />
      <ScrollToTop />
      <NavBar />
      <SearchBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection/>} />
        <Route path="/about" element={<About />} />
         <Route path="/contact" element={<Contact />} />
         <Route path="/product/:productId" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
         <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={<PlaceOrders />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/verify" element={<Verify />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;