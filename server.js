require("dotenv").config();
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require('cors');
const port = process.env.PORT || 5000;

const nodemailer = require("nodemailer");

const app = express();
app.use(cors({ origin: "*", credentials: true })); 
const prisma = new PrismaClient();

app.use(express.json());



app.post("/api/referrals", async (req, res) => {
  try {
    let { name, email, friendName, friendEmail } = req.body;

    
    name = name.trim();
    email = email.trim();
    friendName = friendName.trim();
    friendEmail = friendEmail.trim();

    
    if (!name || !email || !friendEmail || !friendName) {
      return res.status(400).json({ error: "All fields are required." });
    }

    
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email) || !emailRegex.test(friendEmail)) {
      return res.status(400).json({ error: "Invalid email format." });
    }

    
    const existingReferral = await prisma.referral.findUnique({
      where: { friendEmail },
    });

    if (existingReferral) {
      return res.status(400).json({ error: "This email has already been referred!" });
    }

    
    const referral = await prisma.referral.create({
      data: { name, email, friendName, friendEmail },
    });

    res.status(201).json({ message: "Referral submitted successfully!", referral });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});






async function sendReferralEmail(toEmail, referrerName) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  let mailOptions = {
    from: process.env.GMAIL_USER,
    to: toEmail,
    subject: "You've been referred!",
    text: `Hello,\n\nYour friend ${referrerName} has referred you! Join us today and enjoy the benefits.\n\nBest regards,\nTeam`,
  };

  await transporter.sendMail(mailOptions);
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
