import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AuthProvider } from "./contexts/AuthContext";
import SignUp from "../src/components/SignUp";
import Login from "../src/components/Login";
import ResetPassword from "../src/components/ResetPassword";
import PrivateRoute from "../src/components/PrivateRoute";

const App = () => {
  return (
    <div className="overflow-hidden">
      <Router>
        <AuthProvider>
          <div className="min-h-screen bg-gray-100">
            <Routes>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Header />

                    <Home />
                  </PrivateRoute>
                }
              />
              <Route
                path="/product/:id"
                element={
                  <PrivateRoute>
                    <Header />
                    <ProductDetails />
                  </PrivateRoute>
                }
              />
            </Routes>
            <Sidebar />
            <Footer />
          </div>
        </AuthProvider>
      </Router>
    </div>
  );
};

export default App;
