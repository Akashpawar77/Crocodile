const Franchise = require("../models/Franchise");
const twilio = require('twilio');

// ================= SMS =================
const sendSMS = async (franchise) => {
  try {
    const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

    // Format phone number with +91 country code
    let phoneNumber = franchise.phone.trim();
    if (!phoneNumber.startsWith('+')) {
      phoneNumber = '+91' + phoneNumber.replace(/\D/g, '');
    }

    await client.messages.create({
      body: `Hi ${franchise.name}! 🏢 Thank you for your franchise inquiry about Wonder Kids. We'll contact you shortly to discuss this opportunity. - Wonder Kids`,
      from: process.env.TWILIO_PHONE,
      to: phoneNumber
    });

    console.log("📱 SMS sent successfully");
  } catch (err) {
    console.log("SMS Error:", err.message);
  }
};

exports.submitFranchise = async (req, res) => {
  try {
    console.log("🔥 BODY RECEIVED:", req.body); // 👈 ADD THIS

    const data = await Franchise.create(req.body);

    // ✅ SEND SMS
    await sendSMS(data);

    res.json({
      success: true,
      data
    });

  } catch (error) {
    console.error("❌ ERROR:", error.message); // 👈 ADD THIS
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};