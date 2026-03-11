import React, { useState, useEffect } from "react";
import "./Payment.css";

import bee from "../../pic/bee1.png";
import bee1 from "../../pic/bee2.png";
import bee2 from "../../pic/bee3.png";

import phonepe from "../../pic/Phonepay.png";
import gpay from "../../pic/GooglePay.png";
import upi from "../../pic/Paytm.png";

/* ---------------- PROGRAM DATA ---------------- */

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

/* ---------------- FEES ---------------- */

const FEES = [
{ label: "Registration Fee (one-time)", amount: 150 },
{ label: "Activity & Materials Fee", amount: 75 },
];

/* ---------------- PAYMENT METHODS ---------------- */

const PAYMENT_METHODS = [
{ id: "phonepe", label: "PhonePe", icon: phonepe },
{ id: "gpay", label: "Google Pay", icon: gpay },
{ id: "upi", label: "UPI", icon: upi },
];

export default function Payment() {

const [step,setStep] = useState(1);
const [selectedProgram,setSelectedProgram] = useState(null);
const [payMethod,setPayMethod] = useState("phonepe");
const [time,setTime] = useState(300);

const programs = PLANS[0].programs;

/* -------- TIMER -------- */

useEffect(()=>{
if(step !== 2) return;

const timer = setInterval(()=>{
setTime(prev => prev > 0 ? prev - 1 : 0);
},1000);

return ()=>clearInterval(timer);
},[step]);

const minutes = Math.floor(time/60);
const seconds = time % 60;

/* -------- TOTAL -------- */

const calcTotal = () => {

if(!selectedProgram) return 0;

const prog = programs.find(p=>p.id === selectedProgram);

let total = prog.price;

FEES.forEach(f => total += f.amount);

return total;

};

const total = calcTotal();
const prog = programs.find(p => p.id === selectedProgram);

/* ---------------- UI ---------------- */

return (

<div className="payment-page">

<section className="payment-hero">
<h1>One Step to Happy Learning 🎈</h1>
<p>Secure your child's seat in just a few seconds.</p>
</section>

<section className="payment-section">

<div className="stepper">
{["selectedProgram","payMethod","confirmation"].map((s,i)=>(
<div key={s} className={`step ${step===i+1 ? "active":""}`}>
<div className="step-number">{i+1}</div>

<div className="step-label">
{s==="selectedProgram" && "Select Program"}
{s==="payMethod" && "Payment Method"}
{s==="confirmation" && "Confirmation"}
</div>

</div>
))}
</div>

<div className="payment-layout">

<div className="payment-main">

{/* STEP 1 */}

{step===1 && (

<div className="pay-panel">

<h3>Select Your Program</h3>

<div className="program-select-grid">

{programs.map(p => (

<label
key={p.id}
className={`prog-select-card ${selectedProgram===p.id ? "selected":""}`}
>

<input
type="radio"
className="program-radio"
checked={selectedProgram===p.id}
onChange={()=>setSelectedProgram(p.id)}
/>

<img src={p.icon} className="program-icon" alt="program"/>

<div className="program-name">{p.name}</div>

<div className="program-price">₹{p.price}</div>

</label>

))}

</div>

<button
className="btn btn-primary"
disabled={!selectedProgram}
onClick={()=>setStep(2)}
>
Continue to Payment →
</button>

</div>

)}

{/* STEP 2 */}

{step===2 && (

<div className="pay-panel">

<h3>Payment Details</h3>

<div className="payment-timer">
⏱ Complete payment in {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
</div>

<div className="method-selector">

{PAYMENT_METHODS.map(m => (

<button
key={m.id}
className={`method-btn ${payMethod===m.id?"active":""}`}
onClick={()=>setPayMethod(m.id)}
>

<img src={m.icon} width="35" alt="method"/>
<span>{m.label}</span>

</button>

))}

</div>

<div className="upi-qr-box">

<div className="qr-header">
Scan using PhonePe / Google Pay / Paytm
</div>

<div className="qr-code">

<img
src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?pa=monkeydee@upi&am=${total}`}
alt="qr"
/>

</div>

<div className="upi-id">
UPI ID : <b>monkeydee@upi</b>
</div>

</div>

<div className="step-nav">

<button
className="btn btn-secondary"
onClick={()=>setStep(1)}
>
Back
</button>

<button
className="btn btn-primary"
onClick={()=>setStep(3)}
>
Pay ₹{total}
</button>

</div>

</div>

)}

{/* STEP 3 */}

{step===3 && (

<div className="pay-panel confirmation-panel">

<div className="success-animation">✓</div>

<h2>Payment Successful</h2>

<p>Your tuition for <b>{prog?.name}</b> has been received.</p>

<div>Amount Paid : <b>₹{total}</b></div>

<button
className="btn btn-primary"
onClick={()=>{
setStep(1);
setSelectedProgram(null);
setTime(300);
}}
>
Make Another Payment
</button>

</div>

)}

</div>

{/* ORDER SUMMARY */}

<div className="order-summary">

<h4>Order Summary</h4>

{selectedProgram && (

<>

<div className="os-program">

<img src={prog.icon} width="30" alt="icon"/>

<div>
<div>{prog.name}</div>
<div>Monthly tuition</div>
</div>

<strong>₹{prog.price}</strong>

</div>

{FEES.map(f => (

<div key={f.label} className="os-fee-row">
<span>{f.label}</span>
<span>₹{f.amount}</span>
</div>

))}

<div className="os-total">
<span>Total Due</span>
<strong>₹{total}</strong>
</div>

<div className="payment-logos">
<img src={phonepe} width="35" alt="logo"/>
<img src={gpay} width="35" alt="logo"/>
<img src={upi} width="35" alt="logo"/>
</div>

</>

)}

</div>

</div>

</section>

</div>

);

}