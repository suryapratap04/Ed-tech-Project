const User = require("../models/User");
const Otp = require("../models/Otp");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const mailSender = require("../utils/mailSender");

// sendOtps
exports.sendOtp = async (request, response) => {
  try {
    console.log("sendOtp Controller Hit");
    // fetch the email from the request body
    const { email } = request.body;

    // check if the email is already registered
    const checkUser = await User.findOne({ email });

    // if User already exists
    if (checkUser) {
      return response.status(401).json({
        success: false,
        message: "User Already Exists",
      });
    }

    // generate otp
    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // check otp is unique or not
    let result = await Otp.findOne({ otp });

    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });

      result = await Otp.findOne({ otp });
    }

    console.log(`Otp generated: ${otp}`);

    const otpPayload = {
      otp,
      email,
    };

    // save the otp in the database
    const otpBody = await Otp.create(otpPayload);
    console.log(otpBody);

    return response.status(200).json({
      success: true,
      message: "Otp sent successfully",
    });
  } catch (error) {
    console.log(`Error in sendOtp: ${error.message}`);
    return response.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// signUp
exports.signUp = async (request, response) => {
  try {
    // fetch data
    const {
      email,
      password,
      firstName,
      lastName,
      accountType,
      contactNumber,
      otp,
      confirmPassword,
    } = request.body;

    // validation
    if (
      !email ||
      !password ||
      !firstName ||
      !lastName ||
      !otp ||
      !confirmPassword
    ) {
      return response.status(403).json({
        success: false,
        message: "All Fields Required",
      });
    }

    // match the passwords
    if (password !== confirmPassword) {
      return response.status(400).json({
        success: false,
        message: "Password Not Matched Woth Confirm Pwd",
      });
    }

    // cheack user exits or not
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return response.status(400).json({
        success: false,
        message: "User already Exists",
      });
    }

    // find the recent otp
    const recentOtp = await Otp.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    // validate otp
    if (recentOtp.length == 0) {
      return response.status(400).json({
        success: false,
        msg: "Invalid  Otp (otp Not Found)",
      });
    }

    if (otp !== recentOtp) {
      return response.status(400).json({
        success: false,
        message: "Otp Not Matched",
      });
    }

    // hash password
    const hashedPwd = await bcrypt.hash(password, 10);

    // entry in db
    const profileDetails = await Profile.create({
      genfer: null,
      dateOfBirth: null,
      about: null,
      contactNumber: contactNumber,
    });
    const user = User.create({
      email,
      password: hashedPwd,
      firstName,
      lastName,
      accountType,
      contactNumber,
      additionaDetails: profileDetails._id,
      // api that create default image of name profile image
      image: `http://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    // return response
    return response.status(200).json({
      success: true,
      user,
      message: "user SignUp Successfully ",
    });
  } catch (error) {
    console.log(`Error in SignUp: ${error.message}`);
    return response.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// login
exports.logIn = async (request, response) => {
  try {
    // fetch data
    const { email, password } = request.body;

    // invalid filds
    if (!email || !password) {
      return response.status(400).json({
        success: false,
        message: "Please Fill the fields Correctly ",
      });
    }

    //check user exits or not
    const user = await User.findOne({ email }).populate("additionalDetails");
    if (!user) {
      return response.staus(400).json({
        success: false,
        msg: "Invalid , User Not Exits ",
      });
    }

    // generate JWT after Password match
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        {
          email: user.email,
          id: user._id,
          accountType: user.accountType,
        },
        process.env.JWT_SECRET,
        {
          expireIn: "2h",
        }
      );
      (user.token = token), (user.password = undefined);
      // create cookie and response send
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      response.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        msg: "User Loged In Succesfully ",
      });
    } else {
      return response.status(401).json({
        success: false,
        msg: "Password IS incorrect",
      });
    }
  } catch (error) {
    console.log(`Error in Login: ${error.message}`);
    return response.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// changePwd
exports.changePassword = async (request, response) => {
  try {
    // get data from request
    const { email, currentPassword, newPassword, confirmPassword } =
      request.body;

    const user = await User.findOne({ email });
    // validation
    if (!(await bcrypt.compare(currentPassword, user.password))) {
      return response.status(400).json({
        success: false,
        msg: "Incorrect Current Password ",
      });
    } else if (newPassword !== confirmPassword) {
      return response.status(400).json({
        success: false,
        msg: "Password Not matched ",
      });
    }
    const hashedPwd = await bcrypt.hash(newPassword, 10);
    user.password = hashedPwd;

    // send mail ? (password chaged )
    const mailResponse = await mailSender(
      email,
      "Password Changed for User ",
      email
    );
    console.log(mailResponse);

    return response.status(200).json({
      success: true,
      msg: "Password Changed Succeessfully ",
    });
  } catch (error) {
    console.log(`Error in change Password : ${error.message}`);
    return response.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
