const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

// resetPwdToken
exports.resetPwdToken = async (req, res) => {
  try {
    // fetch data
    const { email } = req.body;

    // check user for email , email validation
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        msg: "User not found",
      });
    }

    // token generation
    const token = crypto.randomUUID();

    // user Updation by adding token and expiration time
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        token,
        resetPwdExpires: Date.now() + 3600000,
      },
      { new: true }
    );

    // create link and send mail
    const url = `http://localhost:3000/update-password/${token}`;
    await mailSender(email, "Reset Password Link", url);

    // response
    return res.status(200).json({
      success: true,
      msg: "Reset Password Link sent to your email",
    });
  } catch (error) {
    console.log(`Error in resetPwdToken ${error}`);
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
};

// resetPwd
exports.resetPwd = async (req, res) => {
  try {
    // data fetch
    const { token, confirmPassword, password } = req.body;

    // validation
    if (!token || !confirmPassword || !password) {
      return res.status(400).json({
        success: false,
        msg: "All fields are required",
      });
    }

    // get userdetils
    const userdetails = User.findOne({ token });
    if (!userdetails) {
      return res.status(401).json({
        success: false,
        msg: "Invalid Token",
      });
    }

    // token time check
    if (userdetails.resetPwdExpires < Date.now()) {
      return res.status(401).json({
        success: false,
        msg: "Token Expired",
      });
    }
    // password hashing
    const hashPwd = await bcrypt.hash(password, 10);

    // update password
    await User.findByIdAndUpdate(
      userdetails._id,
      {
        password: hashPwd,
      },
      { new: true }
    );

    // response
    return res.status(200).json({
      success: true,
      msg: "Password Reset Successful",
    });
  } catch (error) {
    console.log(`Error in resetPwd ${error}`);
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
};
