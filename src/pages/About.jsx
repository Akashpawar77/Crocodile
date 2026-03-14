import React from "react";
import "./About.css";
import ab from "../../pic/about1.png";

const values = [
{ emoji: "💛", title: "Learner Centric", color: "#FFBE0B",
desc: "We place every child at the centre of learning. Our teaching approach adapts to the needs, curiosity, and interests of each learner." },

{ emoji: "🤝", title: "Community", color: "#3A86FF",
desc: "We believe education grows stronger with collaboration between teachers, parents, and the community." },

{ emoji: "🌱", title: "Continuous Growth", color: "#06D6A0",
desc: "Children learn best when encouraged to explore, experiment, and grow with confidence every day." },

{ emoji: "🧩", title: "Innovation in Learning", color: "#8338EC",
desc: "Our modern iCan Learning System prepares children to succeed in a fast-changing world through creativity and critical thinking." }
];

const curriculum = [
{ icon:"📖", title:"Language & Literacy", desc:"Phonics, storytelling, and vocabulary through songs, books, and creative writing." },
{ icon:"🔢", title:"Math & Logic", desc:"Counting, patterns, shapes, and early algebra through games and manipulatives." },
{ icon:"🔬", title:"Science & Discovery", desc:"Hands-on experiments, nature exploration, and the scientific method." },
{ icon:"🎨", title:"Arts & Expression", desc:"Painting, sculpture, drama, and music to foster creativity and self-expression." }
];

const team = [
{ name:"Ms. Sandra Rivera", role:"Founder & Principal", emoji:"👩‍💼", exp:"22 years", degree:"M.Ed Early Childhood" },
{ name:"Mr. David Kim", role:"Lead Educator – Pre-K", emoji:"👨‍🏫", exp:"14 years", degree:"B.Ed Child Development" },
{ name:"Ms. Aisha Johnson", role:"Art & Music Director", emoji:"👩‍🎨", exp:"10 years", degree:"B.A Fine Arts Education" },
{ name:"Ms. Priya Patel", role:"STEM Coordinator", emoji:"👩‍🔬", exp:"8 years", degree:"M.S. Education & STEM" }
];

export default function About(){
return(

<div className="about-page">

{/* HERO */}
<div className="about-header">
  <h1>About Us</h1>
</div>
<section className="about-hero">

<div className="hero-text">



<h2>A School Built on <span>Love</span> & <span>Learning</span></h2>

<p>
At Monkey Dee Preschool, we believe childhood is a time of wonder Where Little Minds Grow for Big Dreams, curiosity, 
and joyful discovery.
Since 2010, we have been nurturing young learners in a safe, playful,
and caring environment where every child feels confident to explore the world around them.
It is a joyful home for early childhood learning in our community.
</p>

<p>
At Monkey Dee, children aged 2–6 explore, play, discover,
 and learn in a warm and nurturing environment designed especially for young minds.
 Every smile, question, and small achievement is celebrated, 
 helping each child grow into their happiest and most confident self.
</p>
<p>Our approach has always been learner-centric and forward-thinking.
 Over the years, we have continuously evolved our teaching methods to provide 
 meaningful preschool, playschool, nursery, and kindergarten experiences that
  inspire curiosity and creativity.</p>


</div>


</section>

{/* MISSION */}

<section className="section mission">

<div className="mission-grid">

<div className="mission-text">

<h2>Empowering Every Child to Shine</h2>

<p>
Our mission is to create a safe, joyful, and inspiring learning 
environment where every child feels valued, confident, and excited to learn.
We believe childhood is a beautiful journey of discovery. Through play-based learning,
creative exploration, and caring guidance from our educators, children develop the
confidence to express themselves, the curiosity to ask questions, and the courage to try new things.
</p>
<p>At Monkey Dee Preschool, every child is seen, heard, and celebrated, helping them build the 
  foundation for a lifetime of learning and happiness.</p>

<div className="mission-stats">

<div className="stat">
<strong>98%</strong>
<span>Kindergarten Readiness Rate</span>
</div>

<div className="stat">
<strong>4.9★</strong>
<span>Average Parent Rating</span>
</div>

</div>

</div>

<div className="mission-img">
<img src={ab} alt="story time" className="bounce-img"/>
</div>

</div>

</section>

{/* JOURNEY */}

<section className="section journey">

<h2 className="section-title">Our Journey</h2>

<p className="section-subtitle">
A journey of nurturing young minds and building a joyful learning community.
</p>

<div className="timeline">

<div className="timeline-item">
<div className="year">2010</div>
<h4>School Founded</h4>
<p>Monkey Dee Preschool opened its doors with a vision to create a joyful learning environment.</p>
</div>

<div className="timeline-item">
<div className="year">2015</div>
<h4>Program Expansion</h4>
<p>We expanded our programs to support toddlers, preschoolers, and kindergarten learners.</p>
</div>

<div className="timeline-item">
<div className="year">2020</div>
<h4>iCan Learning System</h4>
<p>Our new age curriculum introduced creativity, innovation, and future-ready skills.</p>
</div>

<div className="timeline-item">
<div className="year">2024</div>
<h4>500+ Graduates</h4>
<p>More than 500 children have grown and graduated from Monkey Dee Preschool.</p>
</div>

</div>

</section>

{/* VALUES */}

<section className="section values">

<h2 className="section-title">What We Stand For</h2>

<p className="section-subtitle">
Our philosophy is built on values that inspire learning,
creativity, and growth for every child.
</p>

<div className="values-grid">

{values.map(v =>(

<div key={v.title} className="value-card" style={{borderTop:`6px solid ${v.color}`}}>

<div className="emoji">{v.emoji}</div>

<h3>{v.title}</h3>

<p>{v.desc}</p>

</div>

))}

</div>

</section>

{/* TEAM */}

<section className="section team">

<h2 className="section-title">Meet the Team</h2>

<p className="section-subtitle">
Passionate educators dedicated to nurturing every child.
</p>

<div className="team-grid">

{team.map(t =>(

<div key={t.name} className="team-card">

<div className="avatar">{t.emoji}</div>

<h3>{t.name}</h3>

<p className="role">{t.role}</p>

<div className="info">
<span>🎓 {t.degree}</span>
<span>⏱ {t.exp} experience</span>
</div>

</div>

))}

</div>

</section>

{/* CURRICULUM */}

<section className="section curriculum">

<h2 className="section-title">Holistic, Play-Based Learning</h2>

<p className="section-subtitle">
Our curriculum covers all developmental domains through play,
projects, and purposeful exploration.
</p>

<div className="curriculum-grid">

{curriculum.map(c =>(

<div key={c.title} className="curriculum-card">

<div className="icon">{c.icon}</div>

<h4>{c.title}</h4>

<p>{c.desc}</p>

</div>

))}

</div>

</section>

</div>

);
}
