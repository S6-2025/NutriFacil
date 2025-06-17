import React from "react";
import { Routes, Route } from "react-router-dom";

import LandingPage from "../pages/LandingPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import About from "../pages/About";
import Profile from "../pages/Profile";
import Result from "../pages/Result";
import Questionary from "../components/Questionary";
import Subscription from "../pages/Subscription";
import NutricionPreferences from "../pages/NutritionPreferences";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <LandingPage />
          </PublicRoute>
        }
      />
      <Route path="/about" element={<About />} />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route
        path="/questionary"
        element={
          <PublicRoute>
            <Questionary />
          </PublicRoute>
        }
      />

      <Route
        path="/plan"
        element={
          <PrivateRoute>
            <Subscription />
          </PrivateRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />

      <Route
        path="/result"
        element={
          <PrivateRoute>
            <Result />
          </PrivateRoute>
        }
      />

      <Route
        path="/nutritional-edit"
        element={
          <PrivateRoute>
            <NutricionPreferences />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
