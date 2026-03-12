import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import programs from "../data/programs";
import "./Enrollment.css";

const INITIAL = {
  parentFirstName: "",
  parentLastName: "",
  email: "",
  phone: "",
  relationship: "",
  childFirstName: "",
  childLastName: "",
  childAge: "",
  childDOB: "",
  gender: "",
  program: "",
  startDate: "",
  medicalNotes: "",
  heardFrom: "",
  agreeTerms: false,
};

function validate(fields) {
  const errs = {};
  if (!fields.parentFirstName.trim()) errs.parentFirstName = "First name is required";
  if (!fields.parentLastName.trim()) errs.parentLastName = "Last name is required";
  if (!fields.email.trim()) {
    errs.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errs.email = "Please enter a valid email address";
  }
  if (!fields.phone.trim()) {
    errs.phone = "Phone number is required";
  } else if (!/^\+?[\d\s\-()]{7,15}$/.test(fields.phone)) {
    errs.phone = "Please enter a valid phone number";
  }
  if (!fields.relationship) errs.relationship = "Please select your relationship";
  if (!fields.childFirstName.trim()) errs.childFirstName = "Child's first name is required";
  if (!fields.childLastName.trim()) errs.childLastName = "Child's last name is required";
  if (!fields.childAge) {
    errs.childAge = "Age is required";
  } else if (Number(fields.childAge) < 2 || Number(fields.childAge) > 6) {
    errs.childAge = "Age must be between 2 and 6";
  }
  if (!fields.childDOB) errs.childDOB = "Date of birth is required";
  if (!fields.gender) errs.gender = "Please select a gender";
  if (!fields.program) errs.program = "Please select a program";
  if (!fields.startDate) errs.startDate = "Please select a start date";
  if (!fields.agreeTerms) errs.agreeTerms = "You must agree to the terms";
  return errs;
}

function ConfirmationModal({ data, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box pop-in" onClick={(e) => e.stopPropagation()}>
        <div className="modal-confetti">🎉🐒🌈🎨⭐</div>
        <h2>Enrollment Submitted!</h2>
        <p className="modal-sub">
          Woohoo! We've received your application for{" "}
          <strong>{data.childFirstName} {data.childLastName}</strong>.
          Our team will contact you at <strong>{data.email}</strong> within 24 hours!
        </p>
        <div className="modal-details">
          <div className="detail-row"><span>👶 Child</span><strong>{data.childFirstName} {data.childLastName}</strong></div>
          <div className="detail-row"><span>🎒 Program</span><strong>{data.program}</strong></div>
          <div className="detail-row"><span>📅 Start Date</span><strong>{data.startDate}</strong></div>
          <div className="detail-row"><span>📞 Phone</span><strong>{data.phone}</strong></div>
        </div>
        <div className="modal-ref">
          📋 Reference #: <strong>MKD-{Date.now().toString().slice(-6)}</strong>
        </div>
        <button className="btn btn-primary btn-full" onClick={onClose}>
          Done — See You Soon! 🌟
        </button>
      </div>
    </div>
  );
}

export default function Enrollment() {
  const location = useLocation();
  const [fields, setFields] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (location.state?.program) {
      setFields(f => ({ ...f, program: location.state.program }));
    }
  }, [location.state]);

  const set = (key) => (e) => {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFields(f => ({ ...f, [key]: val }));
    if (touched[key]) {
      const errs = validate({ ...fields, [key]: val });
      setErrors(prev => ({ ...prev, [key]: errs[key] }));
    }
  };

  const blur = (key) => () => {
    setTouched(t => ({ ...t, [key]: true }));
    const errs = validate(fields);
    setErrors(prev => ({ ...prev, [key]: errs[key] }));
  };

  const nextStep = () => {
    const step1Fields = ["parentFirstName", "parentLastName", "email", "phone", "relationship"];
    const step2Fields = ["childFirstName", "childLastName", "childAge", "childDOB", "gender"];
    const checkFields = step === 1 ? step1Fields : step2Fields;
    const allErrors = validate(fields);
    const stepErrors = {};
    checkFields.forEach(k => { if (allErrors[k]) stepErrors[k] = allErrors[k]; });
    const newTouched = {};
    checkFields.forEach(k => { newTouched[k] = true; });
    setTouched(t => ({ ...t, ...newTouched }));
    setErrors(prev => ({ ...prev, ...stepErrors }));
    if (Object.keys(stepErrors).length === 0) setStep(s => s + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allTouched = Object.fromEntries(Object.keys(INITIAL).map(k => [k, true]));
    setTouched(allTouched);
    const errs = validate(fields);
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      const record = { ...fields, submittedAt: new Date().toISOString(), id: Date.now() };
      const existing = JSON.parse(localStorage.getItem("monkey_dee_enrollments") || "[]");
      localStorage.setItem("monkey_dee_enrollments", JSON.stringify([...existing, record]));
      setSubmitted(true);
    }
  };

  const E = ({ field }) =>
    errors[field] && touched[field] ? (
      <p className="error-msg">⚠ {errors[field]}</p>
    ) : null;

  const cls = (field) =>
    `form-input${errors[field] && touched[field] ? " error" : ""}`;

  return (
    <div className="enrollment-page">
      {submitted && <ConfirmationModal data={fields} onClose={() => { setSubmitted(false); setFields(INITIAL); setStep(1); setTouched({}); }} />}

      <section className="enrollment-hero">
        <h1>Join the <span>Monkey Dee</span> Family!</h1>
        <p>Complete the form below and our team will be in touch within 24 hours to confirm your spot.</p>
      </section>

      <section className="section">
        <div className="section-inner enrollment-inner">

          {/* STEPPER */}
          

          <form className="enrollment-form" onSubmit={handleSubmit} noValidate>

            {/* STEP 1 — PARENT */}
            {step === 1 && (
              <div className="form-step fade-up">
                <h3 className="step-title">👩 Parent / Guardian Information</h3>
                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">First Name *</label>
                    <input className={cls("parentFirstName")} placeholder="Jane" value={fields.parentFirstName} onChange={set("parentFirstName")} onBlur={blur("parentFirstName")} />
                    <E field="parentFirstName" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Last Name *</label>
                    <input className={cls("parentLastName")} placeholder="Doe" value={fields.parentLastName} onChange={set("parentLastName")} onBlur={blur("parentLastName")} />
                    <E field="parentLastName" />
                  </div>
                </div>
                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input type="email" className={cls("email")} placeholder="jane@example.com" value={fields.email} onChange={set("email")} onBlur={blur("email")} />
                    <E field="email" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <input type="tel" className={cls("phone")} placeholder="(555) 123-4567" value={fields.phone} onChange={set("phone")} onBlur={blur("phone")} />
                    <E field="phone" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Relationship to Child *</label>
                  <select className={`form-select${errors.relationship && touched.relationship ? " error" : ""}`} value={fields.relationship} onChange={set("relationship")} onBlur={blur("relationship")}>
                    <option value="">Select relationship...</option>
                    {["Mother", "Father", "Guardian", "Grandparent", "Other"].map(r => <option key={r}>{r}</option>)}
                  </select>
                  <E field="relationship" />
                </div>
                
              </div>
            )}

            {/* STEP 2 — CHILD */}
            {step === 2 && (
              <div className="form-step fade-up">
                <h3 className="step-title">👶 Child's Information</h3>
                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Child's First Name *</label>
                    <input className={cls("childFirstName")} placeholder="Alex" value={fields.childFirstName} onChange={set("childFirstName")} onBlur={blur("childFirstName")} />
                    <E field="childFirstName" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Child's Last Name *</label>
                    <input className={cls("childLastName")} placeholder="Doe" value={fields.childLastName} onChange={set("childLastName")} onBlur={blur("childLastName")} />
                    <E field="childLastName" />
                  </div>
                </div>
                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Age (2–6) *</label>
                    <input type="number" min="2" max="6" className={cls("childAge")} placeholder="3" value={fields.childAge} onChange={set("childAge")} onBlur={blur("childAge")} />
                    <E field="childAge" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Date of Birth *</label>
                    <input type="date" className={cls("childDOB")} value={fields.childDOB} onChange={set("childDOB")} onBlur={blur("childDOB")} />
                    <E field="childDOB" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Gender *</label>
                  <div className="radio-group">
                    {["Girl", "Boy", "Non-binary", "Prefer not to say"].map(g => (
                      <label key={g} className={`radio-btn ${fields.gender === g ? "selected" : ""}`}>
                        <input type="radio" value={g} checked={fields.gender === g} onChange={set("gender")} style={{ display: "none" }} />
                        {g}
                      </label>
                    ))}
                  </div>
                  <E field="gender" />
                </div>
                <div className="form-group">
                  <label className="form-label">Medical Notes / Allergies</label>
                  <textarea className="form-textarea" placeholder="Any allergies, conditions, or special notes for our staff..." value={fields.medicalNotes} onChange={set("medicalNotes")} />
                </div>
                
              </div>
            )}

            {/* STEP 3 — PROGRAM */}
            {step === 3 && (
              <div className="form-step fade-up">
                <h3 className="step-title">🎒 Program & Details</h3>
                <div className="form-group">
                  <label className="form-label">Select Program *</label>
                  <div className="program-radio-grid">
                    {programs.map(p => (
                      <label key={p.id} className={`program-radio ${fields.program === p.title ? "selected" : ""}`} style={{ "--prc": p.color }}>
                        <input type="radio" value={p.title} checked={fields.program === p.title} onChange={set("program")} style={{ display: "none" }} />
                        <span className="pr-emoji">{p.emoji}</span>
                        <span className="pr-title">{p.title}</span>
                        <span className="pr-age">{p.age}</span>
                      </label>
                    ))}
                  </div>
                  <E field="program" />
                </div>
                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Preferred Start Date *</label>
                    <input type="date" className={cls("startDate")} value={fields.startDate} onChange={set("startDate")} onBlur={blur("startDate")} />
                    <E field="startDate" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">How did you hear about us?</label>
                    <select className="form-select" value={fields.heardFrom} onChange={set("heardFrom")}>
                      <option value="">Select...</option>
                      {["Google Search", "Social Media", "Friend / Family", "Flyer / Poster", "Pediatrician", "Other"].map(h => <option key={h}>{h}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className={`checkbox-label ${errors.agreeTerms && touched.agreeTerms ? "error-text" : ""}`}>
                    <input type="checkbox" checked={fields.agreeTerms} onChange={set("agreeTerms")} onBlur={blur("agreeTerms")} />
                    <span>I agree to the <a href="#!">Terms & Conditions</a> and <a href="#!">Privacy Policy</a> of Monkey Dee Preschool *</span>
                  </label>
                  <E field="agreeTerms" />
                </div>
                <div className="step-nav">
                  <button type="submit" className="btn btn-primary btn-full">
                    Submit Enrollment 🎉
                  </button>
                </div>
              </div>
            )}
          </form>

          {/* SIDEBAR */}
          <div className="enrollment-sidebar">
            <div className="sidebar-card">
              <h4>🕐 Office Hours</h4>
              <p>Mon–Fri: 7:30 AM – 6:00 PM</p>
              <p>Saturday: 9:00 AM – 1:00 PM</p>
            </div>
            <div className="sidebar-card">
              <h4>📞 Need Help?</h4>
              <p>(555) 123-4567</p>
              <p>hello@monkeedee.com</p>
            </div>
            <div className="sidebar-card highlight-card">
              <h4>✨ Why Enroll Early?</h4>
              <ul>
                <li>🎯 Secure your preferred program</li>
                <li>📋 Early enrollment discount</li>
                <li>👩‍🏫 Meet your child's teacher</li>
                <li>🏫 Free orientation session</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
