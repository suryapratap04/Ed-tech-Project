const expreess = require("express");
const router = expreess.Router();
const { auth } = require("../middlewares/auth");
const {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
  getEnrolledCourses,
} = require("../controller/Profile");

router.delete("deleteProfile",auth, deleteAccount);
router.post("/updateProfile", auth, updateProfile);
router.get("/getAllUserDetails", auth, getAllUserDetails);

router.put("/getEnrolledCourses", auth, getEnrolledCourses);
router.put("/updateDisplayPicture", auth, updateDisplayPicture);


module.exports = router;