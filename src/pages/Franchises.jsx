import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Franchises.css";

const tiers = [
  {
    id: "starter",
    name: "Starter Franchise",
    emoji: "🌱",
    color: "#06D6A0",
    price: "$45,000",
    royalty: "6% monthly",
    capacity: "Up to 30 children",
    best: false,
    features: [
      "Full brand license",
      "5-day training program",
      "Curriculum starter kit",
      "Marketing materials",
      "Monthly support calls",
      "Online portal access",
    ],
    notIncluded: ["On-site launch support", "Regional exclusivity", "Custom curriculum"],
  },
  {
    id: "growth",
    name: "Growth Franchise",
    emoji: "🚀",
    color: "#FFBE0B",
    price: "$75,000",
    royalty: "5% monthly",
    capacity: "Up to 60 children",
    best: true,
    features: [
      "Full brand license",
      "10-day training program",
      "Complete curriculum package",
      "Digital marketing launch",
      "On-site launch support (7 days)",
      "Weekly support calls",
      "Online portal + app access",
      "Regional exclusivity (5 km)",
    ],
    notIncluded: ["Custom curriculum"],
  },
  {
    id: "master",
    name: "Master Franchise",
    emoji: "👑",
    color: "#8338EC",
    price: "$150,000",
    royalty: "4% monthly",
    capacity: "Unlimited + sub-franchise rights",
    best: false,
    features: [
      "Full brand license",
      "3-week intensive training",
      "Custom curriculum development",
      "Full digital marketing suite",
      "On-site support (30 days)",
      "Dedicated account manager",
      "Sub-franchise rights (up to 10)",
      "Regional exclusivity (50 km)",
      "Priority product updates",
      "Annual leadership summit access",
    ],
    notIncluded: [],
  },
];

const steps = [
  { icon: "📋", title: "Submit Inquiry", desc: "Fill out our franchise interest form with your background, location, and goals." },
  { icon: "📞", title: "Discovery Call", desc: "Our franchise team will schedule a one-on-one video call to walk you through the opportunity." },
  { icon: "📄", title: "Review FDD", desc: "Receive and review our Franchise Disclosure Document with your legal advisor." },
  { icon: "🤝", title: "Sign Agreement", desc: "Sign the franchise agreement and submit your initial fee to secure your territory." },
  { icon: "🎓", title: "Training Program", desc: "Attend our immersive training at HQ — curriculum, operations, marketing, and culture." },
  { icon: "🎉", title: "Grand Opening!", desc: "We'll be there on Day 1 to support your launch and celebrate with your community." },
];

const faqs = [
  { q: "Do I need prior education or childcare experience?", a: "No prior childcare experience is required. We provide comprehensive training. However, passion for children and community is essential!" },
  { q: "What is the typical ROI timeline?", a: "Most franchisees reach break-even within 18–24 months. Many Growth and Master franchisees see profitability within 12–18 months." },
  { q: "Is financing available?", a: "Yes — we partner with SBA-approved lenders and can connect you with financing options that cover up to 70% of the franchise fee." },
  { q: "What territories are available?", a: "We are actively expanding across the Southern US, Southeast, and internationally. Contact us for current territory availability in your area." },
  { q: "What ongoing support do I receive?", a: "All franchisees receive regular coaching calls, access to our digital operations platform, marketing support, curriculum updates, and an annual in-person summit." },
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
          <span className="pill-label">🤝 Franchise Opportunities</span>
          <h1>Own a <span>Monkey Dee</span> Preschool in Your Community</h1>
          <p>
            Join our award-winning franchise network and bring joyful, high-quality early
            childhood education to families near you — with full training, support, and a
            proven brand behind you.
          </p>
          <div className="fh-actions">
            <a href="#franchise-form" className="btn btn-primary">Apply Now 🚀</a>
            <a href="#franchise-tiers" className="btn btn-secondary">View Packages →</a>
          </div>
        </div>
        <div className="fh-visual">
          <img
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80"
            alt="franchise owners"
          />
          <div className="fh-badge fh-b1">🏆 15+ Active Franchises</div>
          <div className="fh-badge fh-b2">📈 Avg. 22% YoY Growth</div>
        </div>
      </section>

      {/* WHY */}
      <section className="section why-section">
        <div className="section-inner">
          <span className="pill-label">💡 Why Monkey Dee?</span>
          <h2 className="section-title">A Business Built on Purpose</h2>
          <div className="why-grid">
            {[
              { icon: "📊", title: "Proven Business Model", desc: "14 years of operations, refined systems, and a track record of profitable schools across multiple markets.", color: "#3A86FF" },
              { icon: "❤️", title: "Meaningful Impact", desc: "You're not just running a business — you're shaping children's lives and strengthening your community.", color: "#FF6B6B" },
              { icon: "🎓", title: "World-Class Training", desc: "From curriculum to operations to marketing — we train you on everything you need to run a thriving school.", color: "#06D6A0" },
              { icon: "📣", title: "Marketing Support", desc: "Professionally designed brand assets, digital campaigns, and social media templates ready to deploy.", color: "#FFBE0B" },
              { icon: "🔧", title: "Operations Platform", desc: "Our proprietary school management software handles enrollment, billing, communications, and reports.", color: "#8338EC" },
              { icon: "🌎", title: "Growing Network", desc: "Join a community of passionate franchise owners who share best practices, support each other, and grow together.", color: "#FB5607" },
            ].map((w) => (
              <div key={w.title} className="why-card" style={{ "--wc": w.color }}>
                <div className="why-icon">{w.icon}</div>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIERS */}
      <section className="section tiers-section" id="franchise-tiers">
        <div className="section-inner">
          <span className="pill-label">💰 Franchise Packages</span>
          <h2 className="section-title">Choose Your Investment Level</h2>
          <p className="section-subtitle">Three tiers designed for first-time owners, growing operators, and regional masters.</p>
          <div className="tiers-grid">
            {tiers.map((t) => (
              <div key={t.id} className={`tier-card ${t.best ? "best" : ""}`} style={{ "--tc": t.color }}>
                {t.best && <div className="best-badge">⭐ Most Popular</div>}
                <div className="tier-top">
                  <span className="tier-emoji">{t.emoji}</span>
                  <h3>{t.name}</h3>
                  <div className="tier-price">{t.price}</div>
                  <div className="tier-sub">Initial franchise fee</div>
                </div>
                <div className="tier-meta">
                  <div className="tm-item"><span>💸 Royalty</span><strong>{t.royalty}</strong></div>
                  <div className="tm-item"><span>👶 Capacity</span><strong>{t.capacity}</strong></div>
                </div>
                <ul className="tier-features">
                  {t.features.map((f) => (
                    <li key={f} className="feat-yes">✓ {f}</li>
                  ))}
                  {t.notIncluded.map((f) => (
                    <li key={f} className="feat-no">✗ {f}</li>
                  ))}
                </ul>
                <button
                  className="btn btn-full tier-btn"
                  style={{ background: t.color, color: t.id === "growth" ? "#1a1a2e" : "white" }}
                  onClick={() => { setForm(f => ({ ...f, tier: t.name })); document.getElementById("franchise-form")?.scrollIntoView({ behavior: "smooth" }); }}
                >
                  Apply for {t.name.split(" ")[0]} →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="section steps-section">
        <div className="section-inner">
          <span className="pill-label">📋 The Journey</span>
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
      <section className="section inquiry-section" id="franchise-form">
        <div className="section-inner inquiry-grid">
          <div className="inquiry-text">
            <span className="pill-label">📬 Get Started</span>
            <h2>Ready to Bring Monkey Dee to Your City?</h2>
            <p>Fill in your details and our franchise development team will be in touch within 2 business days.</p>
            <div className="inquiry-promise">
              {["No obligation — just a conversation", "Confidential inquiry", "Response within 48 hours", "Financing guidance available"].map(p => (
                <div key={p} className="ip-item">✅ {p}</div>
              ))}
            </div>
          </div>
          <div className="inquiry-form-wrap">
            {sent ? (
              <div className="sent-box pop-in">
                <div style={{ fontSize: "3rem", marginBottom: 12 }}>🎉</div>
                <h3>Inquiry Received!</h3>
                <p>Thank you, <strong>{form.name}</strong>! Our franchise team will reach out to <strong>{form.email}</strong> within 48 hours.</p>
                <button className="btn btn-primary" onClick={() => setSent(false)}>Send Another Inquiry</button>
              </div>
            ) : (
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
                <div className="form-group">
                  <label className="form-label">Package of Interest</label>
                  <select className="form-select" value={form.tier} onChange={handleChange("tier")}>
                    <option value="">Select a tier...</option>
                    {tiers.map(t => <option key={t.id} value={t.name}>{t.name} — {t.price}</option>)}
                    <option value="Undecided">Not sure yet</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Tell us about yourself</label>
                  <textarea className="form-textarea" placeholder="Your background, motivation, and any questions..." value={form.message} onChange={handleChange("message")} />
                </div>
                <button type="submit" className="btn btn-primary btn-full">Submit Inquiry 🚀</button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq-section">
        <div className="section-inner">
          <span className="pill-label">❓ Franchise FAQs</span>
          <h2 className="section-title">Common Questions</h2>
          <div className="faq-list">
            {faqs.map(f => <FAQItem key={f.q} {...f} />)}
          </div>
        </div>
      </section>

    </div>
  );
}
