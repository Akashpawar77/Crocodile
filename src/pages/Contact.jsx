import React, { useState } from "react";
import "./Contact.css";

const faqs = [
  { q: "What are your opening hours?", a: "We are open Monday–Friday 7:00 AM to 6:30 PM and Saturdays 8:30 AM to 1:00 PM." },
  { q: "What is the teacher-to-child ratio?", a: "We maintain a maximum 12:1 ratio for ages 2–3, and 15:1 for ages 4–6." },
  { q: "Do you offer a trial day?", a: "Yes! We offer a complimentary half-day orientation session for all new enrollments." },
  { q: "Is there a sibling discount?", a: "Yes — siblings receive a 10% discount on tuition. Contact us for more details." },
  { q: "What meals are provided?", a: "We provide a healthy mid-morning snack. Full-day programs include a nutritious hot lunch." },
  { q: "Are you NAEYC accredited?", a: "Yes, Monkey Dee Preschool is fully NAEYC accredited and holds a 5-Star Quality Rating." },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? "open" : ""}`} onClick={() => setOpen(!open)}>
      <div className="faq-q">
        <span>{q}</span>
        <span className="faq-icon">{open ? "−" : "+"}</span>
      </div>
      {open && <div className="faq-a">{a}</div>}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.email && form.message) {
      setSent(true);
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    }
  };

  return (
    <div className="contact-page">

      <section className="contact-hero">
        <span className="pill-label">📬 Contact Us</span>
        <h1>We'd <span>Love</span> to Hear From You!</h1>
        <p>Have questions? Want to schedule a tour? Our team is friendly, fast, and ready to help.</p>
      </section>

      <section className="section">
        <div className="section-inner contact-grid">

          {/* INFO */}
          <div className="contact-info">
            <h3>Get in Touch</h3>
            {[
              { icon: "📍", title: "Our Address", lines: ["123 Sunshine Lane", "Kidsville, CA 90210"] },
              { icon: "📞", title: "Phone", lines: ["(555) 123-4567", "(555) 987-6543 (Emergency)"] },
              { icon: "✉️", title: "Email", lines: ["hello@monkeedee.com", "admissions@monkeedee.com"] },
              { icon: "🕐", title: "Hours", lines: ["Mon–Fri: 7:00 AM – 6:30 PM", "Saturday: 8:30 AM – 1:00 PM"] },
            ].map((item) => (
              <div key={item.title} className="info-item">
                <div className="info-icon">{item.icon}</div>
                <div>
                  <h4>{item.title}</h4>
                  {item.lines.map(l => <p key={l}>{l}</p>)}
                </div>
              </div>
            ))}

            <div className="social-section">
              <h4>Follow Us</h4>
              <div className="contact-socials">
                {["📘 Facebook", "📸 Instagram", "🐦 Twitter", "▶️ YouTube"].map(s => (
                  <a key={s} href="#!" className="social-pill">{s}</a>
                ))}
              </div>
            </div>
          </div>

          {/* FORM */}
          <div className="contact-form-wrap">
            {sent ? (
              <div className="sent-confirmation pop-in">
                <div className="sent-emoji">🎉</div>
                <h3>Message Sent!</h3>
                <p>Thanks for reaching out! We'll get back to you within 24 hours.</p>
                <button className="btn btn-primary" onClick={() => setSent(false)}>Send Another Message</button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <h3>Send Us a Message</h3>
                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Your Name *</label>
                    <input className="form-input" placeholder="Jane Doe" value={form.name} onChange={handleChange("name")} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input type="email" className="form-input" placeholder="jane@example.com" value={form.email} onChange={handleChange("email")} required />
                  </div>
                </div>
                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Phone (optional)</label>
                    <input type="tel" className="form-input" placeholder="(555) 000-0000" value={form.phone} onChange={handleChange("phone")} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Subject</label>
                    <select className="form-select" value={form.subject} onChange={handleChange("subject")}>
                      <option value="">Select a topic...</option>
                      {["General Inquiry", "Enrollment", "Schedule a Tour", "Tuition & Fees", "Programs", "Other"].map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Message *</label>
                  <textarea className="form-textarea" placeholder="Tell us how we can help..." value={form.message} onChange={handleChange("message")} required />
                </div>
                <button type="submit" className="btn btn-primary btn-full">Send Message 📨</button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* MAP PLACEHOLDER */}
      <section className="section map-section">
        <div className="section-inner">
          <span className="pill-label">📍 Find Us</span>
          <h2 className="section-title">Visit Our Campus</h2>
          <div className="map-placeholder">
            <div className="map-content">
              <div className="map-pin-anim">📍</div>
              <h3>Monkey Dee Preschool</h3>
              <p>123 Sunshine Lane, Kidsville, CA 90210</p>
              <p className="map-desc">Nestled in a quiet, tree-lined neighborhood with easy parking, green play areas, and a warm, welcoming campus.</p>
              <div className="map-directions">
                <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="btn btn-blue">
                  🗺️ Get Directions on Google Maps
                </a>
              </div>
            </div>
            <div className="map-landmarks">
              {[
                { icon: "🚌", label: "Bus Stop: 2 min walk" },
                { icon: "🅿️", label: "Free Parking: 50 spots" },
                { icon: "🌳", label: "Park: Right next door" },
                { icon: "🏥", label: "Hospital: 1.2 km away" },
              ].map(l => (
                <div key={l.label} className="landmark">
                  <span>{l.icon}</span><span>{l.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq-section">
        <div className="section-inner">
          <span className="pill-label">❓ FAQs</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqs.map(f => <FAQItem key={f.q} {...f} />)}
          </div>
        </div>
      </section>

    </div>
  );
}
