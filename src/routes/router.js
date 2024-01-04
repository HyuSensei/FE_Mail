import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import Contact from "../components/Contact";

const AppRoute = (props) => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Contact />} />
        <Route path="*" element={<div>404 NOT FOUND</div>} />
      </Routes>
    </>
  );
};

export default AppRoute;
