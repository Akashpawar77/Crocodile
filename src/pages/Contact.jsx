import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Bus, ParkingCircle, Trees, Hospital, Navigation } from "lucide-react";
import "./Contact.css";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [sent, setSent] = useState(false);

  const handleChange = (k) => (e) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.email && form.message) {
      setSent(true);
      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }
  };

  return (
    <div className="contact-page">

      {/* CONTACT SECTION */}
      <section className="section">
        <div className="section-inner contact-grid">

          {/* INFO */}
          <div className="contact-info">
            <h3>Get in Touch</h3>

            {[
              {
                icon: <MapPin size={22} />,
                title: "Our Address",
                lines: ["123 Sunshine Lane", "Kidsville, CA 90210"],
              },
              {
                icon: <Phone size={22} />,
                title: "Phone",
                lines: ["(555) 123-4567", "(555) 987-6543 (Emergency)"],
              },
              {
                icon: <Mail size={22} />,
                title: "Email",
                lines: ["hello@wonderkids.com", "admissions@wonderkids.com"],
              },
              {
                icon: <Clock size={22} />,
                title: "Hours",
                lines: [
                  "Mon–Fri: 7:00 AM – 6:30 PM",
                  "Saturday: 8:30 AM – 1:00 PM",
                ],
              },
            ].map((item) => (
              <div key={item.title} className="info-item">
                <div className="info-icon">{item.icon}</div>

                <div className="info-text">
                  <h4>{item.title}</h4>
                  {item.lines.map((l) => (
                    <p key={l}>{l}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* FORM */}
          <div className="contact-form-wrap">
            {sent ? (
              <div className="sent-confirmation pop-in">
                <div className="sent-emoji">🎉</div>
                <h3>Message Sent!</h3>
                <p>
                  Thanks for reaching out! We'll get back to you within 24 hours.
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => setSent(false)}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form
                className="contact-form"
                onSubmit={handleSubmit}
                noValidate
              >
                <h3>Send Us a Message</h3>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Your Name *</label>
                    <input
                      className="form-input"
                      placeholder="Jane Doe"
                      value={form.name}
                      onChange={handleChange("name")}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="jane@example.com"
                      value={form.email}
                      onChange={handleChange("email")}
                      required
                    />
                  </div>
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">
                      Phone (optional)
                    </label>
                    <input
                      type="tel"
                      className="form-input"
                      placeholder="(555) 000-0000"
                      value={form.phone}
                      onChange={handleChange("phone")}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Subject</label>
                    <select
                      className="form-select"
                      value={form.subject}
                      onChange={handleChange("subject")}
                    >
                      <option value="">Select a topic...</option>
                      {[
                        "General Inquiry",
                        "Enrollment",
                        "Schedule a Tour",
                        "Tuition & Fees",
                        "Programs",
                        "Other",
                      ].map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Message *</label>
                  <textarea
                    className="form-textarea"
                    placeholder="Tell us how we can help..."
                    value={form.message}
                    onChange={handleChange("message")}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-full"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* MAP SECTION */}
      <section className="section map-section">
        <div className="section-inner">
          <h2 className="section-title">Visit Our Campus</h2>

          <div className="map-card">
            <div className="map-left">
              <div className="map-icon">
                <MapPin size={28} />
              </div>

              <h3>Monkey Dee Preschool</h3>

              <p className="campus-address">
                123 Sunshine Lane, Kidsville, CA 90210
              </p>

              <p className="map-desc">
                Nestled in a quiet, tree-lined neighborhood with easy parking,
                green play areas, and a warm welcoming campus.
              </p>

              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="map-btn"
              >
                <Navigation size={18} />
                Get Directions
              </a>
            </div>

            <div className="map-right">
              {[
                { icon: <Bus size={20} />, label: "Bus Stop – 2 min walk" },
                { icon: <ParkingCircle size={20} />, label: "Free Parking – 50 spots" },
                { icon: <Trees size={20} />, label: "Park – Right next door" },
                { icon: <Hospital size={20} />, label: "Hospital – 1.2 km away" },
              ].map((item) => (
                <div key={item.label} className="landmark-card">
                  <div className="landmark-icon">{item.icon}</div>
                  <p>{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}