const express = require("express");
const router = express.Router();

// import the userController
const { resetPwdToken, resetPwd } = require("../controller/ResetPassword");

const {
  logIn,
  signUp,
  sendOtp,
  changePassword,
} = require("../controller/Auth");

const { auth } = require("../middlewares/auth");
const { reset } = require("nodemon");

// Routing of the controller
router.post("/login", logIn);

router.post("/signup", signUp);

router.post("/sendotp", sendOtp);

router.post("/changepassword", auth, changePassword);

router.post("/reset-password-token", resetPwdToken);

router.post("/reset-password", resetPwd);

// export the Routes
module.exports = router;
