import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import programs from "../data/programs";
import "./Programs.css";

export default function Programs() {

  const location = useLocation();

  const [activeProgram, setActiveProgram] = useState(null);
  const [selectedClass, setSelectedClass] = useState("Playgroup");

  const programContent = {

    Playgroup: {
      age: "2–3 Years",
      duration: "2 Hours / Day",
      description:
        "The Playgroup program introduces toddlers to a joyful and secure learning environment where they begin their first steps into education. Through playful activities, music, storytelling and sensory experiences, children build confidence and develop early social skills.",
      highlights: [
        "Interactive storytelling sessions",
        "Music and rhythm activities",
        "Creative art exploration",
        "Sensory and motor skill development"
      ],
      learning: [
        "Language development",
        "Emotional bonding",
        "Social interaction",
        "Curiosity and exploration"
      ]
    },

    Nursery: {
      age: "3–4 Years",
      duration: "3 Hours / Day",
      description:
        "Nursery helps children transition from playful learning to structured education. The curriculum introduces early language and number skills while encouraging creativity and social interaction.",
      highlights: [
        "English readiness program",
        "Basic mathematics concepts",
        "Creative arts and crafts",
        "Storytelling and imagination building"
      ],
      learning: [
        "Communication skills",
        "Social and emotional growth",
        "Cognitive development",
        "Creative expression"
      ]
    },

    "Junior KG": {
      age: "4–5 Years",
      duration: "3 Hours / Day",
      description:
        "Junior KG builds strong academic and creative foundations. Children explore phonics, numbers, and logical thinking while participating in engaging group activities.",
      highlights: [
        "Phonics based language learning",
        "Mathematical thinking activities",
        "Art and performance sessions",
        "Group learning exercises"
      ],
      learning: [
        "Logical reasoning",
        "Confidence building",
        "Creative thinking",
        "Team collaboration"
      ]
    },

    "Senior KG": {
      age: "5–6 Years",
      duration: "4 Hours / Day",
      description:
        "Senior KG prepares children for primary school with a balanced approach to academics and creativity. Students strengthen reading, writing, and numeracy skills while developing independence.",
      highlights: [
        "Advanced phonics learning",
        "Writing and comprehension",
        "Mathematical reasoning",
        "Creative problem solving"
      ],
      learning: [
        "School readiness",
        "Leadership skills",
        "Independent thinking",
        "Confidence and communication"
      ]
    }
  };

  /* ✅ FIX: HANDLE FOOTER CLICK (HASH) */
  useEffect(() => {
    const hash = decodeURIComponent(location.hash.replace("#", ""));

    if (hash && programContent[hash]) {
      setSelectedClass(hash);

      setTimeout(() => {
        const element = document.getElementById("program-section");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location]);

  const content = programContent[selectedClass];

  return (
    <div className="programs-section">

      <div className="programs-container">

        <h2 className="programs-title">
          Our Programmes
        </h2>

        {/* CLASS SELECTOR */}

        <div className="program-tabs">
          {Object.keys(programContent).map((cls) => (
            <button
              key={cls}
              className={selectedClass === cls ? "active-tab" : ""}
              onClick={() => setSelectedClass(cls)}
            >
              {cls}
            </button>
          ))}
        </div>

        {/* PROGRAM INFORMATION */}

        <div className="program-info">

          {/* ✅ FIXED ID (STATIC) */}
          <h3 id="program-section">{selectedClass}</h3>

          <div className="info-strip">

            <div>
              <p>Age</p>
              <h4>{content.age}</h4>
            </div>

            <div>
              <p>Duration</p>
              <h4>{content.duration}</h4>
            </div>

          </div>

          <p className="program-desc">{content.description}</p>

          <div className="info-grid">

            <div className="info-box">
              <h4>Program Highlights</h4>
              <ul>
                {content.highlights.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="info-box">
              <h4>Learning Outcomes</h4>
              <ul>
                {content.learning.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

          </div>

        </div>


        {/* PROGRAM CARDS */}

        <div className="programs-grid">

          {programs.map((prog) => (
            <div
              key={prog.id}
              className="program-card"
              onClick={() => {
                setSelectedClass(prog.title);
                setActiveProgram(prog);

                window.scrollTo({
                  top: 0,
                  behavior: "smooth"
                });
              }}
            >

              <img
                src={prog.image}
                alt={prog.title}
                className="program-img"
              />

              <div className="program-bottom">

                <h3>{prog.title}</h3>

                {Object.keys(programContent).map((cls) => (
                  <button
                    key={cls}
                    className={selectedClass === prog.title ? "active-tab" : ""}
                    onClick={() => setSelectedClass(prog.title)}
                  >
                  </button>
                ))}

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}