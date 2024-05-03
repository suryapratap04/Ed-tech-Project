const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const OtpSchema = new mongoose.Schema({
  otp: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300,
  },
});

// pre middleware
async function sendVerficationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification From Server (For Sign Up The Account )",
      otp
    );
    console.log(mailResponse);
  } catch (err) {
    console.log("Error in sending the Otp on  email");
    console.log(err);
    throw err;
  }
}

OtpSchema.pre("save", async (next) => {
  await sendVerficationEmail(this.email, this.otp);
  next();
});
module.exports = mongoose.model("Otp", OtpSchema);
