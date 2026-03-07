import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">🐒 <span>Monkey Dee</span></div>
          <p>Where little minds bloom into brilliant futures. Play, learn, and grow with us every day!</p>
          <div className="social-links">
            {["📘 Facebook", "📸 Instagram", "🐦 Twitter", "▶️ YouTube"].map((s, i) => (
              <a key={i} href="#!" className="social-btn">{s}</a>
            ))}
          </div>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            {[["Home", "/"], ["About Us", "/about"], ["Programs", "/programs"], ["Enrollment", "/enrollment"], ["Locate Us", "/locate"], ["Franchises", "/franchises"], ["Pay Fees", "/payment"], ["Contact", "/contact"]].map(([label, to]) => (
              <li key={to}><Link to={to}>{label}</Link></li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4>Programs</h4>
          <ul>
            {["Tiny Explorers (2–3)", "Little Builders (3–4)", "Creative Stars (4–5)", "Kindergarten Prep (5–6)", "After-School Club", "Weekend Workshop"].map((p) => (
              <li key={p}><Link to="/programs">{p}</Link></li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact Us</h4>
          <ul className="contact-list">
            <li>📍 123 Sunshine Lane, Kidsville, CA 90210</li>
            <li>📞 (555) 123-4567</li>
            <li>✉️ hello@monkeedee.com</li>
            <li>🕐 Mon–Fri: 7 AM – 6 PM</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Monkey Dee Preschool. Made with ❤️ for tiny learners.</p>
        <div className="footer-badges">
          <span>🏫 Licensed Preschool</span>
          <span>⭐ NAEYC Accredited</span>
          <span>🔒 Safe & Secure</span>
        </div>
      </div>
    </footer>
  );
}
