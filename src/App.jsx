import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Programs from "./pages/Programs";
import Enrollment from "./pages/Enrollment";
import Contact from "./pages/Contact";
import LocateUs from "./pages/LocateUs";
import Franchises from "./pages/Franchises";
import Payment from "./pages/Payment";
import "./styles/global.css";

export default function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/enrollment" element={<Enrollment />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/locate" element={<LocateUs />} />
            <Route path="/franchises" element={<Franchises />} />
            <Route path="/payment" element={<Payment />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
