const jst = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

// auth
exports.auth = async (request, response, next) => {
  try {
    // Extract token
    var token =
      request.cookies.token ||
      request.body.token ||
      request.header("Authorization").replace("Bearer ", "");
    console.log("Token is ", token);

    //token missing
    if (!token) {
      return response.status(401).json({
        success: true,
        msg: "Token Missing ",
      });
    }

    //verify token
    try {
      // decoded -> payload
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded is ", decoded);
      request.user = decoded;
    } catch (error) {
      console.error(error);
      return response.status(500).json({
        success: false,
        message: "Invalid Token",
      });
    }
    next();
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      success: false,
      message: "auth problem ",
    });
  }
};

// isStudent
exports.isStudent = async (request, response) => {
  try {
    if (request.user.accountType != "Student") {
      return response.status(401).json({
        success: false,
        msg: "This is Protected RouteFor Student ",
      });
    }
    next();
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      success: false,
      message: "something went wrong in Student verification",
    });
  }
};

// isInstrutor
exports.isInstructor = async (request, response) => {
  try {
    if (request.user.accountType != "Instructor") {
      return response.status(401).json({
        success: false,
        msg: "This is Protected RouteFor Instructor ",
      });
    }
    next();
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      success: false,
      message: "something went wrong in Instructor verification",
    });
  }
};

// isAdmin
exports.isAdmin = async (request, response) => {
  try {
    if (request.user.accountType != "Admin") {
      return response.status(401).json({
        success: false,
        msg: "This is Protected RouteFor Admin ",
      });
    }
    next();
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      success: false,
      message: "something went wrong in Admin verification",
    });
  }
};
