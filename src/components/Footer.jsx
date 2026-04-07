import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaEnvelope,
} from "react-icons/fa";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Subscribed Successfully 🎉");
    setEmail("");
  };

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* BRAND */}
        <div className="footer-brand">
          <h2>Wonder Kids</h2>
          <p>
            Where little minds grow through play, creativity, and joyful
            learning every day.
          </p>

          <form className="newsletter" onSubmit={handleSubmit}>
            <FaEnvelope />
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button>Subscribe</button>
          </form>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/programs">Programs</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* ✅ PROGRAM LINKS */}
        <div className="footer-col">
          <h3>Programs</h3>
          <ul>
            <li><Link to="/programs#Playgroup">Playgroup</Link></li>
            <li><Link to="/programs#Nursery">Nursery</Link></li>
            <li><Link to="/programs#Junior KG">Junior KG</Link></li>
            <li><Link to="/programs#Senior KG">Senior KG</Link></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="footer-col">
          <h3>Contact</h3>
          <p>123 Sunshine Lane</p>
          <p>(555) 123-4567</p>
          <p>hello@wonderkids.com</p>

          <div className="social">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaYoutube /></a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Wonder Kids Preschool
      </div>
    </footer>
  );
}