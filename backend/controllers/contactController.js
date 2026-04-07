const Contact = require('../models/Contact');
const { body, validationResult } = require('express-validator');
const twilio = require('twilio');

// ================= SMS =================
const sendSMS = async (contact) => {
  try {
    const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

    // Format phone number with +91 country code
    let phoneNumber = contact.phone.trim();
    if (!phoneNumber.startsWith('+')) {
      phoneNumber = '+91' + phoneNumber.replace(/\D/g, '');
    }

    await client.messages.create({
      body: `Hi ${contact.name}! 👋 Thank you for contacting Wonder Kids. We received your message and will get back to you soon. - Wonder Kids`,
      from: process.env.TWILIO_PHONE,
      to: phoneNumber
    });

    console.log("📱 SMS sent successfully");
  } catch (err) {
    console.log("SMS Error:", err.message);
  }
};

exports.createContact = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').notEmpty().withMessage('Phone is required'),
  body('message').notEmpty().withMessage('Message is required'),

  async (req, res) => {
    console.log("Incoming Data:", req.body); // 🔍 DEBUG

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation Errors:", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const contact = new Contact(req.body);
      await contact.save();

      console.log("Saved:", contact); // 🔍 DEBUG

      // ✅ SEND SMS
      await sendSMS(contact);

      res.status(201).json({
        success: true,
        data: contact
      });
    } catch (error) {
      console.error("Save Error:", error);
      res.status(500).json({ message: error.message });
    }
  }
];

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();

    console.log("Fetched Contacts:", contacts); // 🔍 DEBUG

    res.json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ message: error.message });
  }
};