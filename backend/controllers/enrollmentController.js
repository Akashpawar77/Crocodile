const Enrollment = require('../models/Enrollment');
const { body, validationResult } = require('express-validator');
const twilio = require('twilio');

// ================= SMS =================
const sendSMS = async (enrollment) => {
  try {
    const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

    // Format phone number with +91 country code
    let phoneNumber = enrollment.phone.trim();
    if (!phoneNumber.startsWith('+')) {
      phoneNumber = '+91' + phoneNumber.replace(/\D/g, '');
    }

    await client.messages.create({
      body: `Hi ${enrollment.name}! 🎉 Your enrollment for ${enrollment.program} is successful. We'll contact you soon. - Wonder Kids`,
      from: process.env.TWILIO_PHONE,
      to: phoneNumber
    });

    console.log("📱 SMS sent successfully");
  } catch (err) {
    console.log("SMS Error:", err.message);
  }
};

exports.createEnrollment = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').notEmpty().withMessage('Phone is required'),
  body('program').notEmpty().withMessage('Program is required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const enrollment = new Enrollment(req.body);
      await enrollment.save();
      
      // ✅ SEND SMS
      await sendSMS(enrollment);
      
      res.status(201).json(enrollment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
];

exports.getEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find();
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};