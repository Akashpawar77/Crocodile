import React from "react";
import "./About.css";

const values = [
  { emoji: "💛", title: "Joy First", color: "#FFBE0B", desc: "Learning should be fun! We design every activity to spark delight and excitement in every child." },
  { emoji: "🤝", title: "Community", color: "#3A86FF", desc: "We are more than a school — we are a family. Every child, parent, and teacher belongs here." },
  { emoji: "🌱", title: "Growth Mindset", color: "#06D6A0", desc: "We celebrate effort over results, encouraging children to embrace challenges and learn from mistakes." },
  { emoji: "🧩", title: "Inclusion", color: "#8338EC", desc: "Every child is unique and valued. Our programs celebrate diversity and accommodate every learner." },
  { emoji: "🔍", title: "Curiosity", color: "#FB5607", desc: "We nurture a love of questions, exploration, and discovery that lasts a lifetime." },
  { emoji: "🛡️", title: "Safety", color: "#FF6B6B", desc: "Physical and emotional safety is our foundation. Every child thrives when they feel secure and loved." },
];

const curriculum = [
  { icon: "📖", title: "Language & Literacy", desc: "Phonics, storytelling, and vocabulary through songs, books, and creative writing." },
  { icon: "🔢", title: "Math & Logic", desc: "Counting, patterns, shapes, and early algebra through games and manipulatives." },
  { icon: "🔬", title: "Science & Discovery", desc: "Hands-on experiments, nature exploration, and the scientific method." },
  { icon: "🎨", title: "Arts & Expression", desc: "Painting, sculpture, drama, and music to foster creativity and self-expression." },
 
];

const team = [
  { name: "Ms. Sandra Rivera", role: "Founder & Principal", emoji: "👩‍💼", exp: "22 years", degree: "M.Ed Early Childhood" },
  { name: "Mr. David Kim", role: "Lead Educator – Pre-K", emoji: "👨‍🏫", exp: "14 years", degree: "B.Ed Child Development" },
  { name: "Ms. Aisha Johnson", role: "Art & Music Director", emoji: "👩‍🎨", exp: "10 years", degree: "B.A Fine Arts Education" },
  { name: "Ms. Priya Patel", role: "STEM Coordinator", emoji: "👩‍🔬", exp: "8 years", degree: "M.S. Education & STEM" },
];

export default function About() {
  return (
    <div className="about-page">
    
      {/* HERO */}
      <section className="about-hero">
        <div className="about-hero-inner">
           <h1> About</h1><br></br>
          <h2>A School Built on <span>Love</span> & <span>Learning</span></h2>
          <p>
            Since 2010, Monkey Dee Preschool has been the heart of early childhood education in
            our community — a joyful, safe, and creative space where children aged 2–6 become the
            best version of themselves.
          </p>
        </div>
        <div className="about-hero-imgs">
          <img src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=500&q=80" alt="kids learning" className="about-img-main" />
          <img src="https://images.unsplash.com/photo-1560807707-8cc77767d783?w=300&q=80" alt="outdoor play" className="about-img-small" />
        </div>
      </section>

      {/* MISSION */}
      <section className="section mission-section">
        <div className="section-inner mission-grid">
          <div className="mission-text">
            
            <h2>Empowering Every Child to Shine</h2>
            <p>
              Our mission is to provide an inclusive, stimulating, and joyful learning environment
              where every child is seen, heard, and celebrated. We partner with families to nurture
              the whole child — academically, socially, emotionally, and physically.
            </p>
            <p>
              We believe childhood is not a race — it is a rich, irreplaceable season of wonder.
              Our job is to protect that wonder while gently guiding children toward their fullest potential.
            </p>
            <div className="mission-stats">
              <div className="m-stat"><strong>98%</strong><span>Kindergarten Readiness Rate</span></div>
              <div className="m-stat"><strong>4.9★</strong><span>Average Parent Rating</span></div>
              <div className="m-stat"><strong>12:1</strong><span>Child-to-Teacher Ratio</span></div>
            </div>
          </div>
          <div className="mission-visual">
            <img src="https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?w=500&q=80" alt="story time" />
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section values-section">
        <div className="section-inner">
         
          <h2 className="section-title">What We Stand For</h2>
          <p className="section-subtitle">Six core values guide everything we do — from curriculum design to how we speak with children every day.</p>
          <div className="values-grid">
            {values.map((v) => (
              <div key={v.title} className="value-card" style={{ "--vc": v.color }}>
                <div className="value-emoji">{v.emoji}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CURRICULUM */}
      <section className="section curriculum-section">
        <div className="section-inner">
    
          <h2 className="section-title">Holistic, Play-Based Learning</h2>
          <p className="section-subtitle">Our curriculum covers all developmental domains through play, projects, and purposeful exploration.</p>
          <div className="curriculum-grid">
            {curriculum.map((c) => (
              <div key={c.title} className="curriculum-item">
                <div className="curriculum-icon">{c.icon}</div>
                <div>
                  <h4>{c.title}</h4>
                  <p>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="section team-section">
        <div className="section-inner">
          <span className="pill-label">👩‍🏫 Meet the Team</span>
          <h2 className="section-title">Passionate, Qualified Educators</h2>
          <p className="section-subtitle">Our teachers are not just educators — they are champions of childhood.</p>
          <div className="grid-4">
            {team.map((t) => (
              <div key={t.name} className="team-card">
                <div className="team-avatar">{t.emoji}</div>
                <h3>{t.name}</h3>
                <p className="team-role">{t.role}</p>
                <div className="team-info">
                  <span>🎓 {t.degree}</span>
                  <span>⏱️ {t.exp} exp.</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
