const nodemailer = require("nodemailer");

exports.sendMail = async (to, filePath) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: "Payment Successful 🎉",
    text: "Your payment was successful. Receipt attached.",
    attachments: [
      {
        filename: "receipt.pdf",
        path: filePath
      }
    ]
  });
};