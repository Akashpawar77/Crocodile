const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  parentName: { type: String, required: true },
  studentName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },

  program: { type: String, required: true },
  amount: { type: Number, required: true },

  paymentId: String,
  orderId: String,
  signature: String,

  status: {
    type: String,
    enum: ["pending", "success", "failed"],
    default: "pending"
  },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Payment", paymentSchema);