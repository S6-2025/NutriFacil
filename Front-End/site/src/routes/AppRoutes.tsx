import React from "react";
import { Routes, Route } from "react-router-dom";

import LandingPage from "../pages/LandingPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import About from "../pages/About";
import Profile from "../pages/Profile"
import Result from "../pages/Result"
import Questionary from "../components/Questionary";
import Subscription from "../pages/Subscription";


const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/questionary" element={<Questionary />} />
      <Route path="/subscription" element={<Subscription />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/result" element={<Result />} />
    </Routes>
  );
};

export default AppRoutes;
