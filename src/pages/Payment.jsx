import React, { useState, useEffect } from "react";
import "./Payment.css";

const PLANS = [
  {
    id: "monthly",
    label: "Monthly",
    programs: [
      { id: "tiny", name: "Tiny Explorers (Age 2–3)", emoji: "🌱", price: 850, color: "#FF6B6B" },
      { id: "builder", name: "Little Builders (Age 3–4)", emoji: "🏗️", price: 950, color: "#FFBE0B" },
      { id: "creative", name: "Creative Stars (Age 4–5)", emoji: "🎨", price: 1050, color: "#8338EC" },
      { id: "kprep", name: "Kindergarten Prep (Age 5–6)", emoji: "🎒", price: 1150, color: "#3A86FF" },
      { id: "afterschool", name: "After-School Club", emoji: "🌈", price: 600, color: "#06D6A0" },
      { id: "weekend", name: "Weekend Workshop", emoji: "🦋", price: 300, color: "#FB5607" },
    ],
  },
];

const FEES = [
  { label: "Registration Fee (one-time)", amount: 150, id: "reg", required: true },
  { label: "Activity & Materials Fee", amount: 75, id: "materials", required: true },
  { label: "Meal Plan (optional)", amount: 120, id: "meals", required: false },
  { label: "Transport (optional)", amount: 200, id: "transport", required: false },
];

const PAYMENT_METHODS = [
  { id: "card", label: "Credit / Debit Card", icon: "💳" },
  { id: "paypal", label: "PayPal", icon: "🅿️" },
  { id: "bank", label: "Bank Transfer", icon: "🏦" },
  { id: "applepay", label: "Apple Pay", icon: "🍎" },
];

function formatCard(val) {
  return val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}
function formatExpiry(val) {
  return val.replace(/\D/g, "").slice(0, 4).replace(/^(\d{2})(\d)/, "$1/$2");
}

export default function Payment() {
  const [step, setStep] = useState(1); // 1=select, 2=pay, 3=confirm
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [optionals, setOptionals] = useState({ meals: false, transport: false });
  const [payMethod, setPayMethod] = useState("card");
  const [cardData, setCardData] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);
  const [txnId, setTxnId] = useState("");

  const programs = PLANS[0].programs;

  const toggleOptional = (id) => setOptionals(o => ({ ...o, [id]: !o[id] }));

  const calcTotal = () => {
    if (!selectedProgram) return 0;
    const prog = programs.find(p => p.id === selectedProgram);
    let total = prog ? prog.price : 0;
    FEES.forEach(f => {
      if (f.required || optionals[f.id]) total += f.amount;
    });
    return total;
  };

  const validateCard = () => {
    const errs = {};
    if (!cardData.number || cardData.number.replace(/\s/g, "").length < 16) errs.number = "Enter a valid 16-digit card number";
    if (!cardData.name.trim()) errs.name = "Cardholder name is required";
    if (!cardData.expiry || cardData.expiry.length < 5) errs.expiry = "Enter valid expiry (MM/YY)";
    if (!cardData.cvv || cardData.cvv.length < 3) errs.cvv = "CVV must be 3–4 digits";
    return errs;
  };

  const handlePay = (e) => {
    e.preventDefault();
    if (payMethod === "card") {
      const errs = validateCard();
      setErrors(errs);
      if (Object.keys(errs).length > 0) return;
    }
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setTxnId("MKD-" + Math.random().toString(36).substr(2, 9).toUpperCase());
      // Save to localStorage
      const record = { program: selectedProgram, total: calcTotal(), method: payMethod, date: new Date().toISOString(), txnId };
      const history = JSON.parse(localStorage.getItem("monkey_dee_payments") || "[]");
      localStorage.setItem("monkey_dee_payments", JSON.stringify([...history, record]));
      setStep(3);
    }, 2200);
  };

  const total = calcTotal();
  const prog = programs.find(p => p.id === selectedProgram);

  return (
    <div className="payment-page">

      {/* HERO */}
      <section className="payment-hero">
        <span className="pill-label">💳 Payments</span>
        <h1>Simple, Secure <span>Tuition Payments</span></h1>
        <p>Pay your tuition online in minutes. We use bank-grade 256-bit SSL encryption to keep every transaction safe.</p>
        <div className="security-badges">
          {["🔒 SSL Secured", "✅ PCI Compliant", "🛡️ Fraud Protected", "🔁 Instant Receipt"].map(b => (
            <span key={b} className="sec-badge">{b}</span>
          ))}
        </div>
      </section>

      <section className="section payment-section">
        <div className="section-inner payment-inner">

          {/* STEPPER */}
          <div className="stepper">
            {["Select Program", "Payment Details", "Confirmation"].map((label, i) => (
              <div key={i} className={`step-dot ${step > i + 1 ? "done" : ""} ${step === i + 1 ? "active" : ""}`}>
                <div className="dot-circle">{step > i + 1 ? "✓" : i + 1}</div>
                <span>{label}</span>
              </div>
            ))}
          </div>

          <div className="payment-layout">
            {/* MAIN PANEL */}
            <div className="payment-main">

              {/* STEP 1 — SELECT */}
              {step === 1 && (
                <div className="pay-panel fade-up">
                  <h3 className="pay-step-title">🎒 Select Your Program</h3>
                  <div className="program-select-grid">
                    {programs.map(p => (
                      <label
                        key={p.id}
                        className={`prog-select-card ${selectedProgram === p.id ? "selected" : ""}`}
                        style={{ "--psc": p.color }}
                      >
                        <input type="radio" value={p.id} checked={selectedProgram === p.id} onChange={() => setSelectedProgram(p.id)} style={{ display: "none" }} />
                        <div className="psc-top">
                          <span className="psc-emoji">{p.emoji}</span>
                          {selectedProgram === p.id && <span className="psc-check">✓</span>}
                        </div>
                        <div className="psc-name">{p.name}</div>
                        <div className="psc-price">${p.price.toLocaleString()}<span>/mo</span></div>
                      </label>
                    ))}
                  </div>

                  {selectedProgram && (
                    <div className="optional-fees fade-up">
                      <h4>Optional Add-ons</h4>
                      <div className="optional-grid">
                        {FEES.filter(f => !f.required).map(f => (
                          <label key={f.id} className={`optional-item ${optionals[f.id] ? "selected" : ""}`}>
                            <input type="checkbox" checked={optionals[f.id]} onChange={() => toggleOptional(f.id)} style={{ display: "none" }} />
                            <span className="opt-check">{optionals[f.id] ? "✓" : "+"}</span>
                            <span className="opt-label">{f.label}</span>
                            <span className="opt-price">+${f.amount}/mo</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    className="btn btn-primary btn-full"
                    disabled={!selectedProgram}
                    onClick={() => setStep(2)}
                    style={{ opacity: selectedProgram ? 1 : 0.5, cursor: selectedProgram ? "pointer" : "not-allowed" }}
                  >
                    Continue to Payment →
                  </button>
                </div>
              )}

              {/* STEP 2 — PAYMENT */}
              {step === 2 && (
                <div className="pay-panel fade-up">
                  <h3 className="pay-step-title">💳 Payment Details</h3>

                  {/* METHOD SELECTOR */}
                  <div className="method-selector">
                    {PAYMENT_METHODS.map(m => (
                      <button
                        key={m.id}
                        type="button"
                        className={`method-btn ${payMethod === m.id ? "active" : ""}`}
                        onClick={() => setPayMethod(m.id)}
                      >
                        <span>{m.icon}</span>
                        <span>{m.label}</span>
                      </button>
                    ))}
                  </div>

                  <form onSubmit={handlePay} noValidate>
                    {payMethod === "card" && (
                      <div className="card-form fade-up">
                        {/* CARD PREVIEW */}
                        <div className="card-preview">
                          <div className="cp-chip">💳</div>
                          <div className="cp-number">{cardData.number || "•••• •••• •••• ••••"}</div>
                          <div className="cp-bottom">
                            <div>
                              <div className="cp-label">CARD HOLDER</div>
                              <div className="cp-value">{cardData.name || "YOUR NAME"}</div>
                            </div>
                            <div>
                              <div className="cp-label">EXPIRES</div>
                              <div className="cp-value">{cardData.expiry || "MM/YY"}</div>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <label className="form-label">Card Number *</label>
                          <input
                            className={`form-input${errors.number ? " error" : ""}`}
                            placeholder="1234 5678 9012 3456"
                            value={cardData.number}
                            onChange={e => setCardData(d => ({ ...d, number: formatCard(e.target.value) }))}
                            maxLength={19}
                          />
                          {errors.number && <p className="error-msg">⚠ {errors.number}</p>}
                        </div>
                        <div className="form-group">
                          <label className="form-label">Cardholder Name *</label>
                          <input
                            className={`form-input${errors.name ? " error" : ""}`}
                            placeholder="Jane Doe"
                            value={cardData.name}
                            onChange={e => setCardData(d => ({ ...d, name: e.target.value.toUpperCase() }))}
                          />
                          {errors.name && <p className="error-msg">⚠ {errors.name}</p>}
                        </div>
                        <div className="grid-2">
                          <div className="form-group">
                            <label className="form-label">Expiry Date *</label>
                            <input
                              className={`form-input${errors.expiry ? " error" : ""}`}
                              placeholder="MM/YY"
                              value={cardData.expiry}
                              onChange={e => setCardData(d => ({ ...d, expiry: formatExpiry(e.target.value) }))}
                              maxLength={5}
                            />
                            {errors.expiry && <p className="error-msg">⚠ {errors.expiry}</p>}
                          </div>
                          <div className="form-group">
                            <label className="form-label">CVV *</label>
                            <input
                              className={`form-input${errors.cvv ? " error" : ""}`}
                              placeholder="•••"
                              type="password"
                              value={cardData.cvv}
                              onChange={e => setCardData(d => ({ ...d, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) }))}
                              maxLength={4}
                            />
                            {errors.cvv && <p className="error-msg">⚠ {errors.cvv}</p>}
                          </div>
                        </div>
                      </div>
                    )}

                    {payMethod === "paypal" && (
                      <div className="alt-pay-info fade-up">
                        <div className="api-icon">🅿️</div>
                        <p>You'll be redirected to PayPal to complete your payment of <strong>${total.toLocaleString()}</strong> securely.</p>
                      </div>
                    )}

                    {payMethod === "bank" && (
                      <div className="alt-pay-info fade-up">
                        <div className="api-icon">🏦</div>
                        <div className="bank-details">
                          {[["Bank", "First National Bank"], ["Account Name", "Monkey Dee Preschool LLC"], ["Account No.", "1234-5678-90"], ["Routing No.", "021000021"], ["Reference", "Your Child's Name + Program"]].map(([k, v]) => (
                            <div key={k} className="bank-row"><span>{k}</span><strong>{v}</strong></div>
                          ))}
                        </div>
                      </div>
                    )}

                    {payMethod === "applepay" && (
                      <div className="alt-pay-info fade-up">
                        <div className="api-icon">🍎</div>
                        <p>Tap the button below to pay <strong>${total.toLocaleString()}</strong> with Apple Pay.</p>
                        <div className="applepay-btn">
                          🍎 Pay with Apple Pay
                        </div>
                      </div>
                    )}

                    <div className="step-nav" style={{ marginTop: 24 }}>
                      <button type="button" className="btn btn-secondary" onClick={() => setStep(1)}>← Back</button>
                      <button
                        type="submit"
                        className={`btn btn-primary ${processing ? "processing" : ""}`}
                        disabled={processing}
                      >
                        {processing ? (
                          <><span className="spinner" />Processing...</>
                        ) : (
                          `🔒 Pay $${total.toLocaleString()}`
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* STEP 3 — CONFIRMATION */}
              {step === 3 && (
                <div className="pay-panel confirmation-panel pop-in">
                  <div className="conf-success">
                    <div className="conf-icon">🎉</div>
                    <h2>Payment Successful!</h2>
                    <p>Your tuition for <strong>{prog?.name}</strong> has been received. A receipt has been sent to your email.</p>
                  </div>
                  <div className="conf-details">
                    <div className="cd-row"><span>💳 Transaction ID</span><strong className="txn-id">{txnId || "MKD-" + Math.random().toString(36).substr(2,9).toUpperCase()}</strong></div>
                    <div className="cd-row"><span>🎒 Program</span><strong>{prog?.name}</strong></div>
                    <div className="cd-row"><span>💰 Amount Paid</span><strong className="cd-amount">${total.toLocaleString()}</strong></div>
                    <div className="cd-row"><span>📅 Date</span><strong>{new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</strong></div>
                    <div className="cd-row"><span>💳 Method</span><strong style={{ textTransform: "capitalize" }}>{payMethod === "card" ? "Credit/Debit Card" : payMethod}</strong></div>
                    <div className="cd-row"><span>📋 Status</span><strong className="cd-status">✅ Confirmed</strong></div>
                  </div>
                  <div className="conf-actions">
                    <button className="btn btn-secondary" onClick={() => window.print()}>🖨️ Print Receipt</button>
                    <button className="btn btn-primary" onClick={() => { setStep(1); setSelectedProgram(null); setCardData({ number: "", name: "", expiry: "", cvv: "" }); }}>
                      Make Another Payment
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* ORDER SUMMARY */}
            {step < 3 && (
              <div className="order-summary">
                <h4>Order Summary</h4>
                {selectedProgram ? (
                  <>
                    <div className="os-program">
                      <span>{prog?.emoji}</span>
                      <div>
                        <div className="os-pname">{prog?.name}</div>
                        <div className="os-psub">Monthly tuition</div>
                      </div>
                      <strong>${prog?.price.toLocaleString()}</strong>
                    </div>
                    <div className="os-fees">
                      {FEES.filter(f => f.required || optionals[f.id]).map(f => (
                        <div key={f.id} className="os-fee-row">
                          <span>{f.label}</span>
                          <span>${f.amount}</span>
                        </div>
                      ))}
                    </div>
                    <div className="os-total">
                      <span>Total Due</span>
                      <strong>${total.toLocaleString()}</strong>
                    </div>
                    <div className="os-note">
                      🔒 Secured by 256-bit SSL encryption
                    </div>
                    <div className="payment-logos">
                      {["💳 Visa", "💳 Mastercard", "🅰️ Amex", "🅿️ PayPal"].map(l => (
                        <span key={l} className="pay-logo">{l}</span>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="os-empty">
                    <span>🎒</span>
                    <p>Select a program to see your total</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="section trust-section">
        <div className="section-inner">
          <h2 className="section-title">Why Parents Trust Us</h2>
          <div className="trust-grid">
            {[
              { icon: "🔒", title: "Bank-Level Security", desc: "256-bit SSL encryption on every transaction. Your data is never stored on our servers." },
              { icon: "🔁", title: "Instant Receipts", desc: "Get a digital receipt within seconds of payment. Downloadable PDF available anytime." },
              { icon: "📞", title: "Payment Support", desc: "Our billing team is available Mon–Fri 9AM–5PM to assist with any payment issues." },
              { icon: "📅", title: "Flexible Billing", desc: "Set up auto-pay monthly or choose to pay term-by-term. Cancel or modify anytime." },
            ].map(t => (
              <div key={t.title} className="trust-card">
                <div className="trust-icon">{t.icon}</div>
                <h3>{t.title}</h3>
                <p>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
