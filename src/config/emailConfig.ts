import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

//TODO: CHECK FOR SINGLETONG DESIGN PATTERN
const transporter = nodemailer.createTransport({
  host:process.env.SMTP_HOST,
  port:587,
  secure:false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async (to: string, subject: string, text: string) => {
  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: to,
    subject: subject,
    text: text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
  } catch (error) {
    console.error("Failed to send email:", error);
  }
};
