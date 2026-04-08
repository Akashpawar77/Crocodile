import React, { useState } from "react";
import "./Payment.css";

import bee from "../../pic/bee1.png";
import bee1 from "../../pic/bee2.png";
import bee2 from "../../pic/bee3.png";

const PLANS = [
  {
    id: "monthly",
    programs: [
      { id: "tiny", name: "Tiny Explorers (Age 2–3)", icon: bee, price: 850 },
      { id: "builder", name: "Little Builders (Age 3–4)", icon: bee1, price: 950 },
      { id: "creative", name: "Creative Stars (Age 4–5)", icon: bee2, price: 1050 },
      { id: "kprep", name: "Kindergarten Prep (Age 5–6)", icon: bee2, price: 1150 },
      { id: "afterschool", name: "After-School Club", icon: bee, price: 600 },
      { id: "weekend", name: "Weekend Workshop", icon: bee1, price: 300 },
    ],
  },
];

const FEES = [
  { label: "Registration Fee", amount: 150 },
  { label: "Activity & Materials Fee", amount: 75 },
];

export default function Payment() {

  const [step, setStep] = useState(1);
  const [selectedProgram, setSelectedProgram] = useState(null);
const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState(null);

  const [formData, setFormData] = useState({
    parentName: "",
    studentName: "",
    email: "",
    phone: ""
  });

  const programs = PLANS[0].programs;
  const prog = programs.find(p => p.id === selectedProgram);

  const total = prog
    ? prog.price + FEES.reduce((sum, f) => sum + f.amount, 0)
    : 0;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ✅ FINAL FIXED PAYMENT FUNCTION
  const handlePayment = async () => {

    if (!formData.parentName || !formData.studentName || !formData.email || !formData.phone) {
      alert("Please fill all details");
      return;
    }
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }

    // Validate phone number (basic check)
    if (formData.phone.length < 10) {
      alert("Please enter a valid phone number");
      return;
    }
    try {
      setLoading(true);

      // ✅ SEND FULL DATA (IMPORTANT FIX)
      const orderRes = await fetch("http://localhost:5000/api/payment/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          amount: total,
          formData,
          program: prog?.name
        })
      });

      if (!orderRes.ok) {
        throw new Error("Order API failed");
      }

      const order = await orderRes.json();

      // ⏳ small delay (real app feel)
      await new Promise(resolve => setTimeout(resolve, 1000));

      const options = {
        key: "rzp_test_SUdJQY6A39cve6",
        amount: order.amount,
        currency: "INR",
        name: "Wonder Kids Preschool",
        description: prog?.name,
        order_id: order.id,

        handler: async function (response) {
          try {
            const verifyRes = await fetch("http://localhost:5000/api/payment/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                ...response,
                formData,
                program: prog?.name,
                amount: total
              })
            });

            const data = await verifyRes.json();

            if (data.success) {
              setPaymentData(data.payment);
              setStep(3); // ✅ success screen
            } else {
              alert("Payment verification failed");
            }

          } catch (err) {
            console.error(err);
            alert("Verification error");
          }
        },

        modal: {
          ondismiss: function () {
            setLoading(false);
            alert("Payment cancelled");
          }
        },

        prefill: {
          name: formData.parentName,
          email: formData.email,
          contact: formData.phone
        },

        theme: { color: "#3a86ff" }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      setLoading(false);

    } catch (error) {
      console.error(error);
      alert("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="payment-page">

      <section className="payment-hero">
        <h1>One Step to Happy Learning 🎈</h1>
        <p>Secure your child's seat in seconds</p>
      </section>

      <section className="payment-section">

        <div className="payment-layout">

          {/* LEFT */}
          <div className="payment-main">

            {/* STEP 1 */}
            {step === 1 && (
              <div className="pay-panel">

                <h3>Select Program</h3>

                <div className="program-select-grid">
                  {programs.map(p => (
                    <label
                      key={p.id}
                      className={`prog-select-card ${selectedProgram === p.id ? "selected" : ""}`}
                    >
                      <input
                        type="radio"
                        checked={selectedProgram === p.id}
                        onChange={() => setSelectedProgram(p.id)}
                        className="program-radio"
                      />

                      <img src={p.icon} alt="" className="program-icon" />
                      <div className="program-name">{p.name}</div>
                      <div className="program-price">₹{p.price}</div>
                    </label>
                  ))}
                </div>

                <button
                  className="btn primary-btn"
                  disabled={!selectedProgram}
                  onClick={() => setStep(2)}
                >
                  Continue →
                </button>

              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="pay-panel">

                <h3>Payment Details</h3>
                <div className="payment-info">⏱ Complete payment in 4:50</div>

                <h4>Parent & Student Information</h4>

                <div className="form-group">
                  <label>Parent's Full Name *</label>
                  <input name="parentName" placeholder="Enter parent's full name" value={formData.parentName} onChange={handleChange} className="input-field" required />
                </div>

                <div className="form-group">
                  <label>Student's Full Name *</label>
                  <input name="studentName" placeholder="Enter student's full name" value={formData.studentName} onChange={handleChange} className="input-field" required />
                </div>

                <div className="form-group">
                  <label>Parent's Email Address *</label>
                  <input name="email" type="email" placeholder="parent@example.com" value={formData.email} onChange={handleChange} className="input-field" required />
                </div>

                <div className="form-group">
                  <label>Phone Number *</label>
                  <input name="phone" type="tel" placeholder="Enter phone number" value={formData.phone} onChange={handleChange} className="input-field" required />
                </div>

                {loading && (
                  <p style={{ marginTop: "10px", color: "#555" }}>
                    🔐 Processing payment...
                  </p>
                )}

                <button
                  className="btn primary-btn"
                  onClick={handlePayment}
                  disabled={loading}
                >
                  {loading ? "Processing..." : `Pay ₹${total}`}
                </button>

              </div>
            )}

            {/* STEP 3 */}
{step === 3 && (
              <div className="pay-panel">
                <div style={{textAlign: 'center', marginBottom: '30px'}}>
                  <h2 style={{color: '#10b981', marginBottom: '10px'}}>🎉 Payment Successful!</h2>
                  <div style={{fontSize: '24px', marginBottom: '20px'}}>✅</div>
                </div>

                {paymentData && (
                  <div className="payment-details">
                    <div className="detail-row">
                      <span>Payment ID:</span>
                      <strong>{paymentData.paymentId}</strong>
                    </div>
                    <div className="detail-row">
                      <span>Parent:</span>
                      <strong>{paymentData.parentName}</strong>
                    </div>
                    <div className="detail-row">
                      <span>Student:</span>
                      <strong>{paymentData.studentName}</strong>
                    </div>
                    <div className="detail-row">
                      <span>Program:</span>
                      <strong>{paymentData.program}</strong>
                    </div>
                    <div className="detail-row">
                      <span>Amount:</span>
                      <strong>₹{paymentData.amount}</strong>
                    </div>
                    <div className="detail-row">
                      <span>Date & Time:</span>
                      <strong>{paymentData.createdAt ? new Date(paymentData.createdAt).toLocaleString('en-IN') : 'Just now'}</strong>
                    </div>
                    <div className="detail-row">
                      <span>Status:</span>
                      <strong style={{color: '#10b981'}}>✓ Paid</strong>
                    </div>
                  </div>
                )}

                <div style={{marginTop: '30px', textAlign: 'center'}}>
                  <p style={{color: '#6b7280', marginBottom: '20px'}}>
                    Check your email for the official receipt 📧
                  </p>
                  <button
                    className="btn primary-btn"
                    onClick={() => {
                      setStep(1);
                      setSelectedProgram(null);
                      setFormData({
                        parentName: "",
                        studentName: "",
                        email: "",
                        phone: ""
                      });
                      setPaymentData(null);
                    }}
                    style={{maxWidth: '250px'}}
                  >
                    Make Another Payment
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* RIGHT */}
          <div className="order-summary">

            <h4>Summary</h4>

            {prog && (
              <>
                <div className="os-program">
                  <span>{prog.name}</span>
                  <span></span>
                  <strong>₹{prog.price}</strong>
                </div>

                {FEES.map((f, i) => (
                  <div key={i} className="os-fee-row">
                    <span>{f.label}</span>
                    <span>₹{f.amount}</span>
                  </div>
                ))}

                <div className="os-total">
                  <span>Total Due</span>
                  <strong>₹{total}</strong>
                </div>
              </>
            )}

          </div>

        </div>
      </section>
    </div>
  );
}