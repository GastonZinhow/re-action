import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import MainPage from "./components/MainPage";
import Footer from "./components/Footer";
import History from "./components/History";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
