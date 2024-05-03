const mongoose = require("mongoose");


const CourseProgressSchema = new mongoose.Schema({
  courseID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  completedVideos:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref:"subSection",
    }
  ],
//   progress: [
//     {
//       module: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Module",
//         required: true,
//       },
//       completed: {
//         type: Boolean,
//         default: false,
//       },
//     },
//   ],
});
module.exports = mongoose.model("CourseProgress", CourseProgressSchema);
