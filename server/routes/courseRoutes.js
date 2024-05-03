const express = require("express");
const router = express.Router();

const {
  createCourse,
  getAllCourses,
  getCourseDetails,
} = require("../controller/Course");

const {
  showAllCategory,
  createCategory,
  categoryPageDetails,
} = require("../controller/Category");

const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controller/Section");

const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controller/SubSection");

const {
  createRatingAndReview,
  averageRating,
  getAllRatingAndReview,
} = require("../controller/RatingAndReview");

const {
  auth,
  isInstructor,
  isStudent,
  isAdmin,
} = require("../middlewares/auth");

router.post("/createCourse", auth, isInstructor, createCourse);
router.delete("/deleteSection", auth, isInstructor, deleteSection);
router.post("/addSection", auth, isInstructor, createSection);
router.post("/updateSection", auth, isInstructor, updateSection);

router.post("/updateSubSection", auth, isInstructor, updateSubSection);
router.delete("/deleteSubSection", auth, isInstructor, deleteSubSection);
router.post("/addSubSection", auth, isInstructor, createSubSection);

router.get("/getAllCourses", getAllCourses);
router.get("/getCourseDetails", getCourseDetails);

router.get("/showAllCategory", showAllCategory);
router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/categoryPageDetails", categoryPageDetails);

router.post("/createRating", auth, isStudent, createRatingAndReview);
router.get("/getAverageRating", averageRating);
router.get("/getReviews", getAllRatingAndReview);


module.exports = router;