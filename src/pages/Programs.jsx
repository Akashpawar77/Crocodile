import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import programs from "../data/programs";
import "./Programs.css";

function ProgramCard({ program }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className={`prog-card ${hovered ? "hovered" : ""}`}
      style={{ "--pc": program.color, "--pb": program.bg }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="prog-card-top">
        <h3>{program.title}</h3><br/>
        <div className="prog-age">{program.age}</div><br/>
        {/* <div className="prog-emoji">{program.emoji}</div> */}
        <div className="prog-spots">
          <span className={program.spots <= 5 ? "spots-low" : ""}>
            {program.spots <= 5 ? "⚠️ Only " : "✅ "}{program.spots} spots left
          </span>
        </div>
      </div>
      <p className="prog-desc">{program.description}</p>
      {/* <ul className="prog-features">
        {program.features.map((f) => (
          <li key={f}><span className="feat-dot" />  {f}</li>
        ))}
      </ul> */}
      <div className="prog-footer">
        <div className="prog-schedule">🕐 {program.schedule}</div>
        <button
          className="btn btn-primary prog-btn"
          onClick={() => navigate("/enrollment", { state: { program: program.title } })}
        >
          Enroll →
        </button>
      </div>
    </div>
  );
}

export default function Programs() {
  const [filter, setFilter] = useState("all");
  const ages = ["all", "2-3", "3-4", "4-5", "5-6"];

  const filtered = filter === "all"
    ? programs
    : programs.filter(p => p.age.includes(filter.split("-")[0]));

  return (
    <div className="programs-page">

      <section className="programs-hero">
        {/* <span className="pill-label">🎒 Our Programs</span> */}
        <h1>Find the Perfect Program <span>for Your Child</span></h1>
        <p>Six thoughtfully designed programs for children aged 2–6, each one a unique adventure.</p>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="filter-bar">
            <span className="filter-label">Filter by age:</span>
            {ages.map(a => (
              <button
                key={a}
                className={`filter-btn ${filter === a ? "active" : ""}`}
                onClick={() => setFilter(a)}
              >
                {a === "all" ? "🌈 All Ages" : `Ages ${a}`}
              </button>
            ))}
          </div>

          <div className="programs-grid">
            {filtered.map(p => <ProgramCard key={p.id} program={p} />)}
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      {/* <section className="section comparison-section">
        <div className="section-inner">
          <span className="pill-label">📊 Program Comparison</span>
          <h2 className="section-title">Quick Comparison</h2>
          <div className="comparison-table-wrap">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Program</th>
                  <th>Age</th>
                  <th>Schedule</th>
                  <th>Class Size</th>
                  <th>Focus</th>
                </tr>
              </thead>
              <tbody>
                {programs.map(p => (
                  <tr key={p.id}>
                    <td><span style={{ color: p.color }}>{p.emoji}</span> {p.title}</td>
                    <td>{p.age}</td>
                    <td>{p.schedule}</td>
                    <td>Max {p.spots} children</td>
                    <td>{p.features[0]}, {p.features[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section> */}

      {/* PROCESS */}
      <section className="section process-section">
        <div className="section-inner">
          <span className="pill-label">📋 Enrollment Process</span>
          <h2 className="section-title">How to Enroll in 4 Easy Steps</h2>
          <div className="process-steps">
            {[
              { step: "1", icon: "📝", title: "Fill the Form", desc: "Complete our simple online enrollment form with your child's and parent's details." },
              { step: "2", icon: "📞", title: "Confirmation Call", desc: "Our team will call you within 24 hours to confirm the application and discuss your child's needs." },
              { step: "3", icon: "🏫", title: "School Tour", desc: "Schedule a free tour of our facilities to meet the teachers and explore the classrooms." },
              { step: "4", icon: "🎉", title: "Welcome Aboard!", desc: "Complete enrollment paperwork and prepare for your child's first amazing day at Monkey Dee!" },
            ].map((s) => (
              <div key={s.step} className="process-step">
                <div className="step-number">{s.step}</div>
                <div className="step-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
