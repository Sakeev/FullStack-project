import React from "react";
import { Route, Routes } from "react-router-dom";
import Activation from "../components/auth/Activation";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Home from "../components/Home";
import AddProduct from "../components/products/AddProduct";
import EditProduct from "../components/products/EditProduct";
import ProductList from "../components/products/ProductList";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/activate" element={<Activation />} />
      <Route path="/admin" element={<AddProduct />} />
      <Route path="/edit/:slug" element={<EditProduct />} />
      <Route path="/products" element={<ProductList />} />
    </Routes>
  );
};

export default MainRoutes;
