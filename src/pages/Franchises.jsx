import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCity, FaSchool, FaUsers } from "react-icons/fa";
import "./Franchises.css";

const tiers = [
 
];

const steps = [
  { icon: "📋", title: "Submit Inquiry"},
  { icon: "📞", title: "Discovery Call"},
  { icon: "📄", title: "Review FDD"},
  { icon: "🤝", title: "Sign Agreement"},
  { icon: "🎓", title: "Training Program"},
  { icon: "🎉", title: "Grand Opening!"},
];

const faqs = [
 
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? "open" : ""}`} onClick={() => setOpen(!open)}>
      <div className="faq-q"><span>{q}</span><span className="faq-icon">{open ? "−" : "+"}</span></div>
      {open && <div className="faq-a">{a}</div>}
    </div>
  );
}

export default function Franchises() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", city: "", tier: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.email) setSent(true);
  };

  return (
    <div className="franchise-page">

      {/* HERO */}
      <section className="franchise-hero">
        <div className="fh-blobs">
          <div className="fh-blob fh-blob1" />
          <div className="fh-blob fh-blob2" />
        </div>
        <div className="fh-content">
          <h1 className="pill-access"> Franchise Opportunities</h1>
          <h2>Own a <span>Monkey Dee</span> Preschool in Your Community</h2>
          <p>
            Join our award-winning franchise network and bring joyful, high-quality early
            childhood education to families near you — with full training, support, and a
            proven brand behind you.
          </p>
          
        </div>
        <form onSubmit={handleSubmit} noValidate>
                <h3>Franchise Inquiry Form</h3>
                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input className="form-input" placeholder="Your name" value={form.name} onChange={handleChange("name")} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input type="email" className="form-input" placeholder="you@email.com" value={form.email} onChange={handleChange("email")} required />
                  </div>
                </div>
                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input type="tel" className="form-input" placeholder="(555) 000-0000" value={form.phone} onChange={handleChange("phone")} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">City / State</label>
                    <input className="form-input" placeholder="Los Angeles, CA" value={form.city} onChange={handleChange("city")} />
                  </div>
                </div>
                
                <button type="submit" className="btn btn-primary btn-full">Submit</button>
              </form>
      </section>

    {/* OUR PRESENCE */}
<section className="presence-section">
  <h2 className="presence-title">Our Presence</h2>

  <div className="presence-grid">

    <div className="presence-card cities">
      <div className="presence-icon">
        <FaCity />
      </div>
      <div>
        <h3>29</h3>
        <p>Cities</p>
      </div>
    </div>

    <div className="presence-card centres">
      <div className="presence-icon">
        <FaSchool />
      </div>
      <div>
        <h3>218</h3>
        <p>Centres</p>
      </div>
    </div>

    <div className="presence-card parents">
      <div className="presence-icon">
        <FaUsers />
      </div>
      <div>
        <h3>57608</h3>
        <p>Delighted Parents</p>
      </div>
    </div>

  </div>
</section>
      

      {/* WHY */}
     {/* WHY */}

<section className="why-section">

<h2>Why Choose Monkey-Dee Franchise</h2>

<p className="why-desc">
Are you driven by the passion of making a positive difference in the lives of children?
Here is your chance to set up a successful preschool and day care franchise with a
proven business model.
</p>

<div className="why-grid">

<div className="why-card">
<div className="why-icon">📈</div>
<h3>~ 33% Annual Return</h3>
<p>Earn as much as 20 Lacs per year in Profit</p>
</div>

<div className="why-card">
<div className="why-icon">💰</div>
<h3>Variable Revenue Share</h3>
<p>Variable Revenue Share model</p>
</div>

<div className="why-card">
<div className="why-icon">🎒</div>
<h3>100 Admissions Guaranteed</h3>
<p>In 2 Years or else get compensation</p>
</div>

<div className="why-card">
<div className="why-icon">💵</div>
<h3>Low Investment</h3>
<p>Start your preschool with low investment</p>
</div>

<div className="why-card">
<div className="why-icon">👩‍💻</div>
<h3>Complete Support</h3>
<p>Marketing, hiring, training support</p>
</div>

<div className="why-card">
<div className="why-icon">🤝</div>
<h3>Trusted Brand</h3>
<p>Trusted preschool brand</p>
</div>

</div>

</section>

      {/* TIERS */}
     

      {/* STEPS */}
      <section className="section steps-section">
        <div className="section-inner">
        
          <h2 className="section-title">How to Become a Franchisee</h2>
          <div className="journey-steps">
            {steps.map((s, i) => (
              <div key={i} className="journey-step">
                {i < steps.length - 1 && <div className="jstep-connector" />}
                <div className="jstep-icon">{s.icon}</div>
                <div className="jstep-num">{i + 1}</div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INQUIRY FORM */}


      {/* FAQ */}
   

    </div>
  );
}
 
