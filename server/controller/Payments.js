const Course = require("../models/Course");
const { instance } = require("../config/razorPay");
const User = require("../models/User");
const { mailSender } = require("../utils/mailSender");
const { courseEnrollmentEmail } = require("../mail/courseEnrollementEmail");

// Capture The Payment And initialte the razorpay payment
exports.capturePayment = async (req, res) => {
  try {
    // fetch course id from the request body
    const { courseId } = req.body;
    const userId = req.user.id;

    // validation
    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course Id is Required",
      });
    }

    // valid course details
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course Not Found",
      });
    }

    // check for user already bought the course
    const uid = new mongoose.Types.ObjectId(userId);
    if (course.studentsEnrolled.includes(uid)) {
      return res.status(400).json({
        success: false,
        message: "You have already bought this course",
      });
    }

    // create order
    const payment_capture = 1;
    const amount = course.price * 100;
    const currency = "INR";
    const options = {
      amount,
      currency,
      receipt: Math.random(Date.now()).toString(),
      payment_capture,
      notes: {
        courseId: courseId,
        userId: userId,
      },
    };

    // return response
    const response = await instance.orders.create(options);
    console.log(response);
    return res.status(200).json({
      success: true,
      message: "Order Created",
      data: response,
      CourseName: course.courseName,
      thumbnail: course.thumbnail,
      orderId: response.id,
      amount: course.price,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// verify signature
exports.verifySignature = async (req, res) => {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    const signature = req.headers["x-razorpay-signature"];

    const digest = crypto
      .createHmac("sha256", webhookSecret)
      .update(JSON.stringify(req.body))
      .digest("hex");

    if (digest === signature) {
      console.log("Request is Legit");
      // const { payload } = req.body;
      // const { payment } = payload;
      // const { entity } = payment;
      // const { notes } = entity;
      const { courseId, userId } = req.body.payload.entity.notes;

      // update course
      //   can push by two ways
      const course = await Course.findById(courseId);
      course.studentsEnrolled.push(userId);
      await course.save();

      console.log(course);

      // update user
      //   can push by two ways
      const user = await User.findById(userId);
      user.coursesEnrolled.push(courseId);
      await user.save();

      console.log(user);

      // confirmation email through the template to the user
      const courseDetails = {
        courseName: course.courseName,
        thumbnail: course.thumbnail,
        price: course.price,
      };
      const userDetail = {
        name: user.name,
        email: user.email,
      };

      //   through  the template integraion
      //   can also send the email through the without  template
      mailSender(user.email, courseEnrollmentEmail(courseDetails, userDetail));

      return res.status(200).json({
        success: true,
        message: "Payment Successfull",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid Signature",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
