const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: process.send.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: subject,
      text: text,
      html: text,
    };
    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.log(`error in sending the mail ${error}`);
  }
};

module.exports = mailSender;
