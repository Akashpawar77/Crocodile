const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ Debug ENV
console.log("Razorpay Key:", process.env.RAZORPAY_KEY_ID);

// ✅ MongoDB (you don't need config/db.js if you prefer this)
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ DB Error:", err));

// ✅ Import Routes
const contactRoutes = require("./routes/contactRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const franchiseRoutes = require("./routes/franchiseRoutes");

// ✅ Use Routes
app.use("/api/contact", contactRoutes);
app.use("/api/enrollment", enrollmentRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/franchise", franchiseRoutes);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("API Running...");
});

// ✅ Server
app.listen(process.env.PORT || 5000, () => {
  console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
});