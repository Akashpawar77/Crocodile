const PDFDocument = require("pdfkit");
const fs = require("fs");

exports.generatePDF = (data, filePath) => {
  return new Promise((resolve) => {
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(20).text("Payment Receipt", { align: "center" });
    doc.moveDown();

    doc.text(`Parent: ${data.parentName}`);
    doc.text(`Student: ${data.studentName}`);
    doc.text(`Email: ${data.email}`);
    doc.text(`Phone: ${data.phone}`);
    doc.text(`Program: ${data.program}`);
    doc.text(`Amount: ₹${data.amount}`);
    doc.text(`Payment ID: ${data.paymentId}`);

    doc.end();

    resolve(filePath);
  });
};