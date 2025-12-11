const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

// config mail (Gmail)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

router.post("/send", async (req, res) => {
  const { email, subject, message } = req.body;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      text: message
    });

    res.json({
      action: "send_email",
      status: "success",
      info: { email, subject, message }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      action: "send_email",
      status: "error",
      info: {}
    });
  }
});

module.exports = router;
