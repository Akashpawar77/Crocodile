import React, { useState } from "react";
import "./LocateUs.css";

const branches = [
  {
    id: 1,
    state: "Maharashtra",
    district: "Pune",
    city: "Pune",
    location: "Hinjewadi",
    name: "Wonder Kids — Hinjewadi Campus",
    address: "Hinjewadi Phase 1, Pune",
    phone: "9876543210",
    mapSrc: "https://www.google.com/maps?q=Hinjewadi,Pune&output=embed",
  },
  {
    id: 2,
    state: "Maharashtra",
    district: "Pune",
    city: "Pune",
    location: "Wakad",
    name: "Wonder Kids — Wakad Campus",
    address: "Wakad, Pune",
    phone: "9876543211",
    mapSrc: "https://www.google.com/maps?q=Wakad,Pune&output=embed",
  },
  {
    id: 3,
    state: "Maharashtra",
    district: "Mumbai",
    city: "Mumbai",
    location: "Andheri",
    name: "Wonder Kids — Andheri Campus",
    address: "Andheri West, Mumbai",
    phone: "9876543212",
    mapSrc: "https://www.google.com/maps?q=Andheri,Mumbai&output=embed",
  },
  {
    id: 4,
    state: "Karnataka",
    district: "Bangalore",
    city: "Bangalore",
    location: "Whitefield",
    name: "Wonder Kids — Whitefield Campus",
    address: "Whitefield, Bangalore",
    phone: "9876543213",
    mapSrc: "https://www.google.com/maps?q=Whitefield,Bangalore&output=embed",
  },
];

export default function LocateUs() {

  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");

  const [selected, setSelected] = useState(branches[0]);

  const states = [...new Set(branches.map(b => b.state))];

  const districts = [
    ...new Set(
      branches
        .filter(b => (state ? b.state === state : true))
        .map(b => b.district)
    ),
  ];

  const cities = [
    ...new Set(
      branches
        .filter(b =>
          (state ? b.state === state : true) &&
          (district ? b.district === district : true)
        )
        .map(b => b.city)
    ),
  ];

  const locations = [
    ...new Set(
      branches
        .filter(b =>
          (state ? b.state === state : true) &&
          (district ? b.district === district : true) &&
          (city ? b.city === city : true)
        )
        .map(b => b.location)
    ),
  ];

  const filteredBranches = branches.filter(b =>
    (state ? b.state === state : true) &&
    (district ? b.district === district : true) &&
    (city ? b.city === city : true) &&
    (location ? b.location === location : true)
  );

  return (
    <div className="locate-page">

      
      {/* FILTERS */}

      <div className="locate-title">
        <h1><span className="highlight">Locate</span> Our Centers</h1>
        <div className="filter-bar">
        <select className="btn btn-primary" value={state} onChange={(e)=>setState(e.target.value)}>
          <option value="">Select State</option>
          {states.map((s,i)=>(<option key={i}>{s}</option>))}
        </select>

        <select className="btn btn-primary" value={district} onChange={(e)=>setDistrict(e.target.value)}>
          <option value="">Select District</option>
          {districts.map((d,i)=>(<option key={i}>{d}</option>))}
        </select>

        <select className="btn btn-primary" value={city} onChange={(e)=>setCity(e.target.value)}>
          <option value="">Select City</option>
          {cities.map((c,i)=>(<option key={i}>{c}</option>))}
        </select>

        <select className="btn btn-primary" value={location} onChange={(e)=>setLocation(e.target.value)}>
          <option value="">Select Location</option>
          {locations.map((l,i)=>(<option key={i}>{l}</option>))}
        </select>
        </div>
      </div>

      <div className="locate-container">

        {/* BRANCH LIST */}

        <div className="branch-list">
          {filteredBranches.map((b)=>(
            <div
              key={b.id}
              className={`branch-card ${selected.id === b.id ? "active" : ""}`}
              onClick={()=>setSelected(b)}
            >
              <h3>{b.name}</h3>
              <p>{b.address}</p>
              <p className="phone">{b.phone}</p>
            </div>
          ))}
        </div>

        {/* MAP */}

        <div className="map-box">

          <iframe
            title="map"
            src={selected.mapSrc}
            width="100%"
            height="400"
            style={{border:0}}
            loading="lazy"
          ></iframe>

          <a
            className="direction-btn"
            href={`https://www.google.com/maps/search/${encodeURIComponent(selected.address)}`}
            target="_blank"
            rel="noreferrer"
          >
            Get Directions
          </a>

        </div>

      </div>

    </div>
  );
}