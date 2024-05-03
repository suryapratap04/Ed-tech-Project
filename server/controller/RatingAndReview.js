const ratingAndReviews = require("../models/RatingAndReview");
const Course = require("../models/Course");
const User = require("../models/User");
const RatingAndReview = require("../models/RatingAndReview");

// create Rating and Review
exports.createRatingAndReview = async (req, res) => {
  try {
    const { courseId, rating, review } = req.body;
    const userId = req.user.id;

    // validation
    if (!courseId || !rating || !review) {
      return res.status(400).json({
        success: false,
        message: "All Fields Are required",
      });
    }

    // check for student Enrolled in Course or not
    const courseDetails = await Course.findOne({
      _id: courseId,
      studentEnrolled: { eleMatch: { $eq: userId } },
    });
    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Student is  Not Enrolled in Course",
      });
    }

    // check if Student already given rating and review
    const alreadyReview = await ratingAndReviews.findOne({
      user: userId,
      course: courseId,
    });
    if (alreadyReview) {
      return res.status(403).json({
        success: true,
        message: "You have already given Rating and Review",
      });
    }

    // create rating and review
    const newRatingAndReview = await ratingAndReviews.create({
      course: courseId,
      user: userId,
      rating,
      review,
    });

    // update course rating
    await Course.findByIdAndUpdate(
      courseId,
      {
        $push: { ratingAndReviews: newRatingAndReview._id },
      },
      { new: true }
    );

    // return response
    return res.status(200).json({
      success: true,
      message: "Rating and Review Created",
      data: newRatingAndReview,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Average rating
exports.averageRating = async (request, response) => {
  try {
    const courseId = request.body.courseId;
    const course = await Course.findById(courseId);
    if (!course) {
      return response.status(404).json({
        success: false,
        message: "Course Not Found",
      });
    }

    const result = await ratingAndReviews.aggregate([
      {
        $match: { course: new mongoose.Types.ObjectId(courseId) },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    // if rating and reviews exits
    if (result.length > 0) {
      return response.status(200).json({
        success: true,
        message: "Average Rating",
        averageRating: result[0].averageRating,
      });
    }

    // if not exits
    return response.status(200).json({
      success: true,
      message: "Average Rating",
      averageRating: 0,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// get all rating of user not course Specific
exports.getAllRatingAndReview = async (request, response) => {
  try {
    const allReviews = await RatingAndReview.find({})
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        select: "firstName, lastName, email, image",
      })
      .populate({
        path: "course",
        select: "courseName",
      })
      .exec();

    return response.status(200).json({
      success: true,
      message: "All Rating and Review",
      data: allReviews,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// get All rating of course
exports.getAllRatingAndReviewOfCourse = async (request, response) => {
  try {
    const courseId = request.body.courseId;
    const course = await Course.findById(courseId);
    if (!course) {
      return response.status(404).json({
        success: false,
        message: "Course Not Found",
      });
    }

    const ratingAndReview = await ratingAndReviews
      .find({ course: courseId })
      .populate({
        path: "user",
        select: "firstName, lastName, email, image",
      })
      .populate({
        path: "course",
        select: "courseName",
      });

    return response.status(200).json({
      success: true,
      message: "All Rating and Review",
      data: ratingAndReview,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
