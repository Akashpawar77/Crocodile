const Razorpay = require("razorpay");
const crypto = require("crypto");
const Payment = require("../models/Payment");
const nodemailer = require("nodemailer");

// ================= EMAIL =================
const sendEmail = async (payment) => {
  try {
    console.log("📧 Attempting to send email to payment:", payment);

    if (!payment) {
      console.log("❌ Payment object is null/undefined");
      return;
    }

    if (!payment.email) {
      console.log("❌ Payment email is missing:", payment);
      return;
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: payment.email,
      subject: "Payment Receipt - Wonder Kids 🎉",
      html: `
        <h2>Payment Successful 🎉</h2>
        <p><b>Name:</b> ${payment.parentName}</p>
        <p><b>Program:</b> ${payment.program}</p>
        <p><b>Amount:</b> ₹${payment.amount}</p>
        <p><b>Payment ID:</b> ${payment.paymentId}</p>
      `
    });

    console.log("📧 Email sent successfully to:", payment.email);
  } catch (err) {
    console.log("Email Error:", err.message);
  }
};

// ================= CREATE ORDER =================
exports.createOrder = async (req, res) => {
  try {
    const { amount, formData, program } = req.body;

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    });

    await Payment.create({
      ...formData,
      program,
      amount,
      orderId: order.id,
      status: "pending"
    });

    res.json(order);

  } catch (error) {
    console.error("Order Error:", error);
    res.status(500).json({ error: "Order creation failed" });
  }
};

// ================= VERIFY PAYMENT =================
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      formData
    } = req.body;

    console.log("🔍 Verify Request Body:", req.body);
    console.log("🔍 FormData:", formData);

    const sign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (sign !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid signature"
      });
    }

    const payment = await Payment.findOneAndUpdate(
      { orderId: razorpay_order_id },
      {
        ...formData, // ✅ ADD FORM DATA
        paymentId: razorpay_payment_id,
        signature: razorpay_signature,
        status: "success"
      },
      { new: true }
    );

    console.log("🔍 Updated Payment:", payment);

    if (!payment) {
      console.log("❌ Payment not found for orderId:", razorpay_order_id);
      return res.status(404).json({ error: "Payment not found" });
    }

    if (!payment.email) {
      console.log("❌ No email in payment:", payment);
      return res.status(400).json({ error: "No email provided" });
    }

    // ✅ EMAIL ONLY
    await sendEmail(payment);

    res.json({ success: true, payment });

  } catch (error) {
    console.error("Verify Error:", error);
    res.status(500).json({ error: "Verification failed" });
  }
};

// ================= GET PAYMENTS =================
exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: "Fetch failed" });
  }
};