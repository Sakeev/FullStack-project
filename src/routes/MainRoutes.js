import React from "react";
import { Route, Routes } from "react-router-dom";
import Activation from "../components/auth/Activation";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Home from "../components/Home";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/activate" element={<Activation />} />
    </Routes>
  );
};

export default MainRoutes;
