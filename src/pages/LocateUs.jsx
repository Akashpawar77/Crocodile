import React, { useState } from "react";
import "./LocateUs.css";

const branches = [
  {
    id: 1,
    name: "Monkey Dee — Sunshine Main Campus",
    address: "123 Sunshine Lane, Kidsville, CA 90210",
    phone: "(555) 123-4567",
    email: "main@monkeedee.com",
    hours: "Mon–Fri: 7:00 AM – 6:30 PM · Sat: 8:30 AM – 1:00 PM",
    tag: "Main Campus",
    tagColor: "#FFBE0B",
    emoji: "🏫",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.95373531531677!3d-37.81720997975195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sMelbourne+VIC+3000%2C+Australia!5e0!3m2!1sen!2sus!4v1234567890",
    features: ["Main Playground", "Swimming Pool", "Library", "Cafeteria"],
    parking: "50 free spots",
    transport: "Bus Route 12, 45 · Metro: Sunshine Station",
  },
  {
    id: 2,
    name: "Monkey Dee — Maplewood Branch",
    address: "456 Maple Ave, Maplewood, CA 90211",
    phone: "(555) 234-5678",
    email: "maplewood@monkeedee.com",
    hours: "Mon–Fri: 7:30 AM – 6:00 PM · Sat: Closed",
    tag: "Branch",
    tagColor: "#3A86FF",
    emoji: "🌿",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0!2d144.97!3d-37.80!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sMelbourne!5e0!3m2!1sen!2sus!4v1",
    features: ["Art Studio", "Sensory Garden", "Music Room"],
    parking: "25 free spots",
    transport: "Bus Route 7 · 5-min walk from Maplewood Park",
  },
  {
    id: 3,
    name: "Monkey Dee — Riverside Branch",
    address: "789 River Road, Riverside, CA 90212",
    phone: "(555) 345-6789",
    email: "riverside@monkeedee.com",
    hours: "Mon–Fri: 7:00 AM – 6:30 PM · Sat: 9:00 AM – 12:00 PM",
    tag: "Branch",
    tagColor: "#06D6A0",
    emoji: "🌊",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3154.0!2d144.96!3d-37.82!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sMelbourne!5e0!3m2!1sen!2sus!4v1",
    features: ["Nature Trail", "STEM Lab", "Yoga Studio"],
    parking: "30 free spots",
    transport: "Bus Route 22 · Near Riverside Community Center",
  },
  {
    id: 4,
    name: "Monkey Dee — Downtown Express",
    address: "101 Central Plaza, Suite 3, CA 90213",
    phone: "(555) 456-7890",
    email: "downtown@monkeedee.com",
    hours: "Mon–Fri: 7:00 AM – 7:00 PM · Sat: 8:00 AM – 2:00 PM",
    tag: "Express",
    tagColor: "#8338EC",
    emoji: "🏙️",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3150.0!2d144.95!3d-37.81!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sMelbourne!5e0!3m2!1sen!2sus!4v1",
    features: ["Extended Hours", "Drop-in Care", "Rooftop Play Area"],
    parking: "Paid parking garage adjacent",
    transport: "Metro Lines A & B · 1-min walk from Central Plaza station",
  },
];

export default function LocateUs() {
  const [selected, setSelected] = useState(branches[0]);

  return (
    <div className="locate-page">
      {/* HERO */}
      <section className="locate-hero">
        <span className="pill-label">📍 Locate Us</span>
        <h1>
          Find Your Nearest <span>Monkey Dee</span>
        </h1>
        <p>
          With 4 locations across the region, there's always a Monkey Dee close to home.
          Every campus is warm, safe, and full of learning adventures.
        </p>
        <div className="locate-stats">
          <div className="ls-stat"><strong>4</strong><span>Campuses</span></div>
          <div className="ls-sep" />
          <div className="ls-stat"><strong>3</strong><span>Cities</span></div>
          <div className="ls-sep" />
          <div className="ls-stat"><strong>500+</strong><span>Families Nearby</span></div>
          <div className="ls-sep" />
          <div className="ls-stat"><strong>14 yrs</strong><span>In the Community</span></div>
        </div>
      </section>

      {/* BRANCH PICKER + MAP */}
      <section className="section locate-section">
        <div className="section-inner">
          {/* BRANCH CARDS ROW */}
          <div className="branch-tabs">
            {branches.map((b) => (
              <button
                key={b.id}
                className={`branch-tab ${selected.id === b.id ? "active" : ""}`}
                style={{ "--btc": b.tagColor }}
                onClick={() => setSelected(b)}
              >
                <span className="bt-emoji">{b.emoji}</span>
                <div>
                  <div className="bt-name">{b.name.split("—")[1].trim()}</div>
                  <div className="bt-tag" style={{ color: b.tagColor }}>{b.tag}</div>
                </div>
              </button>
            ))}
          </div>

          {/* MAP + INFO GRID */}
          <div className="map-info-grid">
            {/* MAP EMBED */}
            <div className="map-embed-wrap">
              <iframe
                key={selected.id}
                title={selected.name}
                src={selected.mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="map-overlay-badge">
                <span>{selected.emoji}</span>
                <span>{selected.name.split("—")[1].trim()}</span>
              </div>
            </div>

            {/* INFO PANEL */}
            <div className="branch-info-panel">
              <div className="bip-tag" style={{ background: selected.tagColor + "22", color: selected.tagColor }}>
                {selected.tag}
              </div>
              <h2>{selected.name}</h2>

              <div className="bip-detail">
                <span className="bip-icon">📍</span>
                <div>
                  <strong>Address</strong>
                  <p>{selected.address}</p>
                </div>
              </div>
              <div className="bip-detail">
                <span className="bip-icon">📞</span>
                <div>
                  <strong>Phone</strong>
                  <p><a href={`tel:${selected.phone}`}>{selected.phone}</a></p>
                </div>
              </div>
              <div className="bip-detail">
                <span className="bip-icon">✉️</span>
                <div>
                  <strong>Email</strong>
                  <p><a href={`mailto:${selected.email}`}>{selected.email}</a></p>
                </div>
              </div>
              <div className="bip-detail">
                <span className="bip-icon">🕐</span>
                <div>
                  <strong>Hours</strong>
                  <p>{selected.hours}</p>
                </div>
              </div>
              <div className="bip-detail">
                <span className="bip-icon">🚌</span>
                <div>
                  <strong>Transport</strong>
                  <p>{selected.transport}</p>
                </div>
              </div>
              <div className="bip-detail">
                <span className="bip-icon">🅿️</span>
                <div>
                  <strong>Parking</strong>
                  <p>{selected.parking}</p>
                </div>
              </div>

              <div className="bip-features">
                <strong>Campus Features</strong>
                <div className="feat-pills">
                  {selected.features.map((f) => (
                    <span key={f} className="feat-pill" style={{ borderColor: selected.tagColor, color: selected.tagColor }}>
                      ✓ {f}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bip-actions">
                <a
                  href={`https://www.google.com/maps/search/${encodeURIComponent(selected.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary"
                >
                  🗺️ Get Directions
                </a>
                <a href={`tel:${selected.phone}`} className="btn btn-secondary">
                  📞 Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ALL LOCATIONS LIST */}
      <section className="section all-locations">
        <div className="section-inner">
          <span className="pill-label">🗺️ All Locations</span>
          <h2 className="section-title">Every Campus at a Glance</h2>
          <div className="locations-grid">
            {branches.map((b) => (
              <div
                key={b.id}
                className="location-card"
                style={{ "--lc": b.tagColor }}
                onClick={() => { setSelected(b); window.scrollTo({ top: 300, behavior: "smooth" }); }}
              >
                <div className="lc-header">
                  <span className="lc-emoji">{b.emoji}</span>
                  <span className="lc-tag" style={{ background: b.tagColor }}>{b.tag}</span>
                </div>
                <h3>{b.name.split("—")[1].trim()}</h3>
                <p>{b.address}</p>
                <p className="lc-phone">{b.phone}</p>
                <div className="lc-hours">{b.hours.split("·")[0].trim()}</div>
                <button className="btn btn-secondary lc-btn">View on Map →</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
