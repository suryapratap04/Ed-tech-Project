const Section = require("../models/Section");
const Course = require("../models/Course");

// create section
exports.createSection = async (req, res) => {
  try {
    // data fetch
    const { sectionName, courseId } = req.body;

    // data validation
    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        msg: "All Fields are required",
      });
    }

    // create section
    const newSection = await Section.create({
      sectionName,
    });

    // update course

    const updatedCourse = await Course.findByIdAndUpdate(
      { courseId },
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      { new: true }
    );

    // Populate the section and subsection
    const populatedCourse = await updatedCourse
      .populate("courseContent")
      .execPopulate();

    console.log(updatedCourse);
    console.log(populatedCourse);

    // response
    return res.status(200).json({
      success: true,
      msg: "Section Created Successfully",
      data: populatedCourse,
    });
  } catch (err) {
    console.log(`Error in createSection ${err}`);
    res.status(500).json(err);
  }
};

// update section
exports.updateSection = async (req, res) => {
  try {
    // fetch data
    const { sectionId, sectionName } = req.body;

    // data validation
    if (!sectionId || !sectionName) {
      return res.status(400).json({
        success: false,
        msg: "All Fields are required",
      });
    }

    // update section
    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        sectionName,
      },
      { new: true }
    );

    // response
    return res.status(200).json({
      success: true,
      msg: "Section Updated Successfully",
      data: updatedSection,
    });
  } catch (err) {
    console.log(`Error in updateSection ${err}`);
    res.status(500).json(err);
  }
};

// delete section
exports.deleteSection = async (req, res) => {
  try {
    // fetch data
    const { sectionId, courseId } = req.params || req.body;

    // data validation
    if (!sectionId) {
      return res.status(400).json({
        success: false,
        msg: "All Fields are required",
      });
    }

    // is it need to delete the section from courseContent array in Course model?

    // delete section
    await Section.findByIdAndDelete({ _id: sectionId });

    // update Course
    const updatedCourse = await Course.findByIdAndUpdate(
      { courseId },
      {
        $pull: {
          subSection: sectionId,
        },
      },
      { new: true }
    );

    // response
    return res.status(200).json({
      success: true,
      msg: "Section Deleted Successfully",
    });
  } catch (err) {
    console.log(`Error in deleteSection ${err}`);
    res.status(500).json(err);
  }
};
