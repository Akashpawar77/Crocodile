import React, { useState } from "react";
import "./Enrollment.css";

const INITIAL = {
  parentFirstName: "",
  parentLastName: "",
  email: "",
  phone: "",
  relationship: ""
};

function validate(fields) {
  const errs = {};

  if (!fields.parentFirstName.trim()) errs.parentFirstName = "First name is required";
  if (!fields.parentLastName.trim()) errs.parentLastName = "Last name is required";

  if (!fields.email.trim()) {
    errs.email = "Email is required";
  }

  if (!fields.phone.trim()) {
    errs.phone = "Phone number is required";
  }

  if (!fields.relationship) {
    errs.relationship = "Please select relationship";
  }

  return errs;
}

export default function Enrollment() {

  const [fields, setFields] = useState(INITIAL);
  const [errors, setErrors] = useState({});

  const set = (key) => (e) => {
    setFields({ ...fields, [key]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const errs = validate(fields);
  setErrors(errs);

  if (Object.keys(errs).length !== 0) return;

  try {
    const res = await fetch("http://localhost:5000/api/enrollment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: fields.parentFirstName + " " + fields.parentLastName,
        email: fields.email,
        phone: fields.phone,
        program: fields.relationship, // you can change later
      }),
    });

    const data = await res.json();
    console.log("Response:", data);

    if (res.ok) {
      alert("Enrollment submitted successfully 🎉");
      setFields(INITIAL);
    } else {
      alert("Failed to submit");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Server error");
  }
};

  return (
    <div className="enrollment-page">

      <section className="enrollment-hero">
        <h1>Join the <span>Wonder Kids</span> Family!</h1>
        <p>Complete the form below and our team will contact you within 24 hours.</p>
      </section>

      <section className="section">

        <div className="section-inner enrollment-inner">

          {/* FORM */}

          <form className="enrollment-form" onSubmit={handleSubmit}>

            <h3 className="step-title">Parent / Guardian Information</h3>

            <div className="grid-2">

              <div className="form-group">
                <label>First Name *</label>
                <input
                  className="form-input"
                  value={fields.parentFirstName}
                  onChange={set("parentFirstName")}
                />
                {errors.parentFirstName && <p className="error-msg">{errors.parentFirstName}</p>}
              </div>

              <div className="form-group">
                <label>Last Name *</label>
                <input
                  className="form-input"
                  value={fields.parentLastName}
                  onChange={set("parentLastName")}
                />
                {errors.parentLastName && <p className="error-msg">{errors.parentLastName}</p>}
              </div>

            </div>


            <div className="grid-2">

              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  className="form-input"
                  value={fields.email}
                  onChange={set("email")}
                />
                {errors.email && <p className="error-msg">{errors.email}</p>}
              </div>

              <div className="form-group">
                <label>Phone *</label>
                <input
                  className="form-input"
                  value={fields.phone}
                  onChange={set("phone")}
                />
                {errors.phone && <p className="error-msg">{errors.phone}</p>}
              </div>

            </div>


            <div className="form-group">
              <label>Relationship to Child *</label>
              <select
                className="form-select"
                value={fields.relationship}
                onChange={set("relationship")}
              >
                <option value="">Select relationship</option>
                <option>Mother</option>
                <option>Father</option>
                <option>Guardian</option>
                <option>Grandparent</option>
              </select>
              {errors.relationship && <p className="error-msg">{errors.relationship}</p>}
            </div>

            <button type="submit" className="btn btn-primary btn-full">
              Submit Information
            </button>

          </form>


          {/* SIDEBAR (UNCHANGED) */}

          <div className="enrollment-sidebar">

            <div className="sidebar-card">
              <h4>Office Hours</h4>
              <p>Mon–Fri: 7:30 AM – 6:00 PM</p>
              <p>Saturday: 9:00 AM – 1:00 PM</p>
            </div>

            <div className="sidebar-card">
              <h4>Need Help?</h4>
              <p>(555) 123-4567</p>
              <p>hello@wonderkids.com</p>
            </div>

            <div className="sidebar-card highlight-card">
              <h4>Why Enroll Early?</h4>
              <ul>
                <li>Secure your preferred program</li>
                <li>Early enrollment discount</li>
                <li>Meet your child's teacher</li>
                <li>Free orientation session</li>
              </ul>
            </div>

          </div>

        </div>

      </section>

    </div>
  );
}