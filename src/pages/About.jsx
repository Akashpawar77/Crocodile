import React from "react";
import "./About.css";

const values = [
  { 
    emoji: "💛", 
    title: "Learner Centric", 
    color: "#FFBE0B", 
    desc: "We place every child at the centre of learning. Our teaching approach adapts to the needs, curiosity, and interests of each learner." 
  },

  { 
    emoji: "🤝", 
    title: "Community", 
    color: "#3A86FF", 
    desc: "We believe education grows stronger with collaboration between teachers, parents, and the community." 
  },

  { 
    emoji: "🌱", 
    title: "Continuous Growth", 
    color: "#06D6A0", 
    desc: "Children learn best when encouraged to explore, experiment, and grow with confidence every day." 
  },

  { 
    emoji: "🧩", 
    title: "Innovation in Learning", 
    color: "#8338EC", 
    desc: "Our modern iCan Learning System prepares children to succeed in a fast-changing world through creativity and critical thinking." 
  }
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

          <p>
            Monkey Dee Kids has always been learner centric and open to change which has reflected
            in our approach towards preschool, playschool, kindergarten, and nursery learning
            over the last 30 years. Our new age iCan Learning System prepares children for a
            thriving and accelerated world.
          </p>
        </div>

        <div className="about-hero-imgs">
          <img src="pic\about.jpg" alt="kids learning" className="about-img-main"/>
        </div>
      </section>


      {/* MISSION */}
      <section className="section mission-section">
        <div className="section-inner mission-grid">
          <div className="mission-text">

            <h2><b>Empowering Every Child to Shine</b></h2>

            <p>
              Our mission is to provide an inclusive, stimulating, and joyful learning
              environment where every child is seen, heard, and celebrated.We believe childhood is a precious stage where curiosity, creativity,
              and confidence grow naturally.
            </p>

            <div className="mission-stats">
              <div className="m-stat"><strong>98%</strong><span>Kindergarten Readiness Rate</span></div>
              <div className="m-stat"><strong>4.9★</strong><span>Average Parent Rating</span></div>
            </div>

          </div>

          <div className="mission-visual">
            <img
              src="pic\about2.jpg" alt="story time"
            />
          </div>
        </div>
      </section>


      {/* VALUES */}
      <section className="section values-section">
        <div className="section-inner">

          <h2 className="section-title">What We Stand For</h2>

          <p className="section-subtitle">
            Our philosophy is built on values that inspire learning,
            creativity, and growth for every child.
          </p>

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
     {/* CURRICULUM */}
<section className="section curriculum-section">
  <div className="section-inner">

    <h2 className="section-title">Holistic, Play-Based Learning</h2>

    <p className="section-subtitle">
      Our curriculum covers all developmental domains through play,
      projects, and purposeful exploration.
    </p>

    <div className="curriculum-row">
      {curriculum.map((c) => (
        <div key={c.title} className="curriculum-card">
          <div className="curriculum-icon">{c.icon}</div>
          <h4>{c.title}</h4>
          <p>{c.desc}</p>
        </div>
      ))}
    </div>

  </div>
</section>

      {/* TEAM */}
      {/* TEAM */}
<section className="section team-section">
  <div className="section-inner">

    <h2 className="section-title">Meet the Team</h2>

    <p className="section-subtitle">
      Passionate educators dedicated to nurturing every child.
    </p>

    <div className="team-grid">
      {team.map((t) => (
        <div key={t.name} className="team-card">

          <div className="team-avatar">{t.emoji}</div>

          <h3>{t.name}</h3>

          <p className="team-role">{t.role}</p>

          <div className="team-info">
            <span>🎓 {t.degree}</span>
            <span>⏱ {t.exp} experience</span>
          </div>

        </div>
      ))}
    </div>

  </div>
</section>

    </div>
  );
}
