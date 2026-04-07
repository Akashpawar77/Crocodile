import React, { useState } from "react";
import { FaCity, FaSchool, FaUsers } from "react-icons/fa";
import "./Franchises.css";

export default function Franchises() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    message: ""
  });

  const [sent, setSent] = useState(false);

  // ✅ Handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ✅ Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("📤 Sending:", form);

    if (!form.name || !form.email) {
      alert("Please fill required fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/franchise", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (data.success) {
        setSent(true);

        // auto hide popup
        setTimeout(() => setSent(false), 3000);

        // reset form
        setForm({
          name: "",
          email: "",
          phone: "",
          city: "",
          message: ""
        });
      } else {
        alert("Submission failed");
      }

    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div className="franchise-page">

      {/* ✅ SUCCESS POPUP */}
      {sent && (
        <div className="success-popup">
          ✅ Form submitted successfully!
        </div>
      )}

      {/* HERO SECTION */}
      <section className="franchise-hero">

        {/* LEFT SIDE CONTENT */}
        <div className="fh-content">
          <h1>Franchise Opportunities</h1>
          <h2>Own a <span>Wonder Kids</span> Preschool</h2>
          <p>Start your journey with us today 🚀</p>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="inquiry-form-wrap">
          <form onSubmit={handleSubmit} noValidate>

            <h3>Franchise Inquiry Form</h3>

            <div className="grid-2">

              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  name="name"
                  className="form-input"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email *</label>
                <input
                  name="email"
                  type="email"
                  className="form-input"
                  placeholder="you@email.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

            </div>

            <div className="grid-2">

              <div className="form-group">
                <label className="form-label">Phone</label>
                <input
                  name="phone"
                  type="tel"
                  className="form-input"
                  placeholder="(555) 000-0000"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">City / State</label>
                <input
                  name="city"
                  className="form-input"
                  placeholder="Los Angeles, CA"
                  value={form.city}
                  onChange={handleChange}
                />
              </div>

            </div>

            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea
                name="message"
                className="form-input"
                placeholder="Write your message..."
                value={form.message}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-full">
              Submit
            </button>

          </form>
        </div>

      </section>

      {/* PRESENCE SECTION */}
      <section className="presence-section">
        <h2 className="presence-title">Our Presence</h2>

        <div className="presence-grid">

          <div className="presence-card">
            <FaCity />
            <h3>29</h3>
            <p>Cities</p>
          </div>

          <div className="presence-card">
            <FaSchool />
            <h3>218</h3>
            <p>Centres</p>
          </div>

          <div className="presence-card">
            <FaUsers />
            <h3>57608</h3>
            <p>Parents</p>
          </div>

        </div>
      </section>

    </div>
  );
}