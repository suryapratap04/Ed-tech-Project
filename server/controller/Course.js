const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const { cloudinaryConnect } = require("../utils/CloudinaryUploader");

// createCourese Function
exports.createCourse = async (request, response) => {
  try {
    // fetch data
    const { courseName, courseDescription, whatYouWillLearn, price, category } =
      request.body;

    // fetch file
    const { thumbnail } = request.files.thumbnailImage;

    // validation
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !category ||
      !thumbnail
    ) {
      return response.status(200).json({
        success: false,
        message: "All Fields Are required ",
      });
    }

    // check for instructor
    const userId = request.user.id;
    const insreuctorDetails = await User.findById(userId);
    console.log(`instructor Details are ${insreuctorDetails}`);
    if (!insreuctorDetails) {
      return response.status(404).json({
        success: false,
        message: "Instructor Not Found ",
      });
    }

    // check Given category is valid or not
    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return response.status(404).json({
        success: false,
        message: "category Not Found ",
      });
    }

    // upload image to cliudinary
    const thumbnailImage = await cloudinaryConnect(
      thumbnail,
      process.env.process.env.FOLDER_NAME
    );

    // course cretion entry in the database
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: insreuctorDetails._id,
      whatYouWillLearn,
      price,
      thumbnail: thumbnailImage.secure_url,
      category: categoryDetails._id,
    });

    // Update the User (Instructor) with the course
    await User.findByIdAndUpdate(
      insreuctorDetails._id,
      {
        $push: { courses: newCourse._id },
      },
      { new: true }
    );

    // add course  tag
    await Category.findByIdAndUpdate(
      categoryDetails._id,
      {
        $push: { courses: newCourse._id },
      },
      { new: true }
    );

    // send response
    return response.status(200).json({
      success: true,
      message: "Course Created Successfully",
      data: newCourse,
    });
  } catch (error) {
    console.log("Error in Course Creation ");
    console.error(error);
    return response.status(500).json({
      success: false,
      msg: "Error in Course Creation",
    });
  }
};

// get All Courses
exports.getAllCourses = async (request, response) => {
  try {
    const courses = await Course.find(
      {},
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReviews: true,
        studentsEnrolled: true,
      }
    )
      .populate("instructor")
      .exec();
    return response.status(200).json({
      success: true,
      message: "All Courses",
      data: courses,
    });
  } catch (error) {
    console.log("Error in getting all courses");
    console.error(error);
    return response.status(500).json({
      success: false,
      message: "Error in getting all courses",
    });
  }
};

// get Course details
exports.getCourseDetails = async (request, response) => {
  try {
    // fetch data
    const { courseId } = request.body;
    if (!courseId) {
      return response.status(400).json({
        success: false,
        message: "Course Id is Required",
      });
    }

    // get course details
    const course = await Course.findById(courseId)
      .populate({
        path: "instructor",
        populate: {
          path: "additinonalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();
    if (!course) {
      return response.status(404).json({
        success: false,
        message: "Course Not Found",
      });
    }

    return response.status(200).json({
      success: true,
      message: "Course Details",
      data: course,
    });
  } catch (error) {
    console.log("Error in getting course details");
    console.error(error);
    return response.status(500).json({
      success: false,
      message: "Error in getting course details",
    });
  }
};
