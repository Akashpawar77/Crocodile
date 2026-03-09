import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import programs from "../data/programs";
import "./Home.css";

function StatCard({ number, label}) {
  return (
    <div className="stat-card">
      {/* <span className="stat-emoji">{emoji}</span> */}
      <div className="stat-number">{number}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function FeatureCard({ emoji, title, desc, color }) {
  return (
    <div className="feature-card" style={{ "--accent": color }}>
      <div className="feature-icon">{emoji}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

function TestimonialCard({ quote, name, child, avatar }) {
  return (
    <div className="testimonial-card">
      <div className="quote-mark">"</div>
      <p className="quote-text">{quote}</p>
      <div className="testimonial-author">
        <div className="author-avatar">{avatar}</div>
        <div>
          <div className="author-name">{name}</div>
          <div className="author-child">{child}</div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="home">
      {/* HERO */}
      <section className="hero" ref={heroRef}>
        <div className="hero-blobs">
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          <div className="blob blob-3" />
        </div>
        <div className="hero-content">
          {/* <span className="pill-label">🌟 Enrolling Now for 2025–2026</span> */}
          <h1 className="hero-title">
            Where Little Minds <span className="highlight">Bloom</span> Into
            Big Dreamers!
          </h1>
          {/* <p className="hero-desc">
            Monkey Dee Preschool is a nurturing, play-based learning environment where
            children aged 2–6 discover the joy of learning through creativity, curiosity,
            and connection.
          </p> */}
          <div className="hero-actions">
           <Link to="/enrollment" className="btn btn-primary">
            🎉 Enroll Your Child
          </Link>
            <Link to="/programs" className="btn btn-secondary" >
              Explore Programs →
            </Link>
          </div>
          {/* <div className="hero-trust">
            <span>⭐⭐⭐⭐⭐</span>
            <span>Rated 4.9 by 200+ families</span>
          </div> */}
        </div>
        <div className="hero-visual">
          <div className="hero-image-wrapper">
            <img
              src="../pic/child1.png"
              alt="Happy kids at Monkey Dee"
              className="hero-img"
            />
            {/* <div className="hero-badge badge-1">🏅 NAEYC Accredited</div>
            <div className="hero-badge badge-2">👩‍🏫 Certified Teachers</div>
            <div className="hero-badge badge-3">🌈 Since 2010</div> */}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-bar">
        <div className="stats-inner">
          <div>
            <img className="pic" src="../pic/education.png"/>
            <StatCard number="500+" label="Happy Graduates"/></div>
          <div>
            <img className="pic" src="../pic/teacher (1).png"/>
            <StatCard number="15" label="Expert Teachers" />
          </div>
          <div>
            <img className="pic" src="../pic/gift-box.png"/>
            <StatCard number="6" label="Fun Programs"/>
          </div>
          <div>
            <img className="pic" src="../pic/love.png"/>
            <StatCard number="14" label="Years of Love" />
          </div>
        </div>
      </section>

      {/* FEATURES 
      <section className="section features-section">
        <div className="section-inner">
          <span className="pill-label">✨ Why Monkey Dee?</span>
          <h2 className="section-title">A Place Where Kids Thrive</h2>
          <p className="section-subtitle">
            We believe every child is a natural learner. Our approach combines play, curiosity,
            and caring educators to make magic happen every day.
          </p>
          <div className="grid-3">
            {[
              { emoji: "🧠", title: "Brain-Based Learning", color: "#8338EC", desc: "Our curriculum is rooted in neuroscience, designed to support cognitive, emotional, and social development." },
              { emoji: "🌿", title: "Nature-Connected", color: "#06D6A0", desc: "Daily outdoor time and garden activities connect children with nature and build a love for the environment." },
              { emoji: "🎵", title: "Arts & Music", color: "#FF6B6B", desc: "Creative expression through art, music, and drama builds confidence and nurtures the whole child." },
              { emoji: "👨‍👩‍👧", title: "Family Partnership", color: "#FFBE0B", desc: "We treat families as partners — regular updates, open-door policy, and community events keep everyone connected." },
              { emoji: "🔒", title: "Safe & Secure", color: "#3A86FF", desc: "Keycard access, CCTV, CPR-certified staff, and strict health protocols so parents always feel at ease." },
              { emoji: "📚", title: "School Readiness", color: "#FB5607", desc: "By the time children leave us, they're academically, socially, and emotionally ready to flourish in kindergarten." },
            ].map((f) => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>
        </div>
      </section>*/}

      {/* PROGRAMS PREVIEW */}
      <section className="section programs-preview">
        <div className="section-inner">
          {/* <span className="pill-label">🎒 Our Programs</span> */}
          <div className="pro-title">
            <img className="pro-pic" src="../pic/software.png" />
            <span className="highlight"> Our Programs</span>
          </div>
          <h2 className="section-title">Learning Adventures for Every Age</h2>
          <p className="section-subtitle">From toddlers to kindergarteners, we have the perfect program for your child.</p>
          <div className="program-preview-grid">
           
            {programs.slice(0, 3).map((p) => (
              <div key={p.id} className="program-preview-card" style={{ "--color": p.color, "--bg": p.bg }}>
                {/* <div className="pp-emoji">{p.emoji}</div> */}
                 {/* <img src="../pic/unicorn.png" classname="pic"/> */}
                <h3>{p.title}</h3>
                <div className="pp-age">{p.age}</div>
                <div className="pp-schedule">{p.schedule}</div>
                <p>{p.description}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 36 }}>
            <Link to="/programs" className="btn btn-purple">See All Programs →</Link>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="section gallery-section">
        <div className="section-inner">
          {/* <span className="pill-label">📸 School Life</span> */}
          <h2 className="section-title">A Day at Monkey Dee</h2>
          <div className="gallery-grid">
            {[
              { src: "../pic/chlild3.jpg", label: "Art Time 🎨" },
              { src: "https://images.unsplash.com/photo-1560807707-8cc77767d783?w=400&q=80", label: "Outdoor Play 🌳" },
              { src: "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?w=400&q=80", label: "Story Time 📖" },
              { src: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?w=400&q=80", label: "Science Fun 🔬" },
            ].map((img, i) => (
              <div key={i} className="gallery-item">
                <img src={img.src} alt={img.label} />
                <div className="gallery-label">{img.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      {/* <section className="section testimonials-section">
        <div className="section-inner">
          <span className="pill-label">💬 Parent Love</span>
          <h2 className="section-title">What Families Say</h2>
          <div className="grid-3">
            {[
              { quote: "Monkey Dee transformed our shy 3-year-old into a confident, curious explorer. The teachers are absolutely incredible!", name: "Sarah M.", child: "Parent of Lily, age 4", avatar: "👩" },
              { quote: "The curriculum is thoughtful, the environment is warm, and our son genuinely cannot wait to get to school every morning.", name: "James & Priya T.", child: "Parents of Aryan, age 3", avatar: "👨" },
              { quote: "After 2 years at Monkey Dee, our daughter entered kindergarten way ahead of her class. Best investment we ever made.", name: "Michelle D.", child: "Parent of Emma, age 6", avatar: "👩‍🦱" },
            ].map((t, i) => (
              <TestimonialCard key={i} {...t} />
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA BANNER */}
      <div className="cta-on">
        <div className="cta-content">
          {/* <div className="cta-emoji">🐒</div> */}
          <h2>Ready to Join the Monkey Dee Family?</h2>
          <p>Spots fill fast — secure your child's place in our award-winning preschool today!</p>
          <div className="cta-buttons">
            <Link to="/enrollment" className="btn btn-primary">Enroll Now 🎉</Link>
            <Link to="/contact" className="btn btn-secondary">Schedule a Tour →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
