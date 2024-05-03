const Profile = require("../models/Profile");
const User = require("../models/User");

// Update Profile
exports.updateProfile = async (request, response) => {
  try {
    // get data
    const {
      dateOfBirth = "",
      about = "",
      contactNumber,
      gender,
    } = request.body;

    // fetch userId
    const userId = request.user.id;

    // validation
    if (!contactNumber || !gender || userId) {
      return response.status(400).json({
        success: false,
        msg: "All Fields are required",
      });
    }

    // user details
    const userDetails = await User.findById(userId);
    const profileId = userDetails.additionaDetails;

    const profileDetails = await Profile.findById(profileId);

    // update profile
    profileDetails.dateOfBirth = dateOfBirth;
    profileDetails.about = about;
    profileDetails.contactNumber = contactNumber;
    profileDetails.gender = gender;
    await profileDetails.save();

    // response
    return response.status(200).json({
      success: true,
      msg: "Profile Updated Successfully",
      data: profileDetails,
    });
  } catch (error) {
    console.log("Error in updating profile");
    console.error(error);
    return response.status(500).json({
      success: false,
      msg: "Error in updating profile",
    });
  }
};

// delete Account
exports.deleteAccount = async (request, response) => {
  try {
    // fetch userId
    const userId = request.user.id;

    // validation
    if (!userId) {
      return response.status(400).json({
        success: false,
        msg: "All Fields are required",
      });
    }

    // user details
    const userDetails = await User.findById(userId);
    const profileId = userDetails.additionaDetails;

    // unenrolled user from all courses
    await Course.updateMany(
      {
        students: userId,
      },
      {
        $pull: {
          students: userId,
        },
      }
    );

    // delete profile
    await Profile.findByIdAndDelete(profileId);
    await User.findByIdAndDelete(userId);

    // response
    return response.status(200).json({
      success: true,
      msg: "Account Deleted Successfully",
    });
  } catch (error) {
    console.log("Error in deleting account");
    console.error(error);
    return response.status(500).json({
      success: false,
      msg: "Error in deleting account",
    });
  }
};

// fetch userDetails
exports.getAllUserDetails = async (request, response) => {
  try {
    // fetch userId
    const userId = request.user.id;

    // validation
    if (!userId) {
      return response.status(400).json({
        success: false,
        msg: "All Fields are required",
      });
    }

    // user details
    const userDetails = await User.findById(userId);
    const profileId = userDetails.additionaDetails;

    // fetch profile details
    const profileDetails = await Profile.findById(profileId);

    // response
    return response.status(200).json({
      success: true,
      msg: "User Details Fetched Successfully",
      data: profileDetails,
    });
  } catch (error) {
    console.log("Error in fetching user details");
    console.error(error);
    return response.status(500).json({
      success: false,
      msg: "Error in fetching user details",
    });
  }
};

// Update Display Picture
exports.updateDisplayPicture = async (request, response) => {
  try {
    return response.json({
      success: true,
      msg: "write code for updating display picture",
    });
  } catch (error) {
    console.log("Error in updating display picture");
    console.error(error);
    return response.status(500).json({
      success: false,
      msg: "Error in updating display picture",
    });
  }
};

// Get Enrolled Courses
exports.getEnrolledCourses = async (request, response) => {
  try {
    return response.json({
      success: true,
      msg: "write code for updating get Enrolled Courses",
    });
  } catch (error) {
    console.log("Error in fetching enrolled courses");
    console.error(error);
    return response.status(500).json({
      success: false,
      msg: "Error in fetching enrolled courses",
    });
  }
};
