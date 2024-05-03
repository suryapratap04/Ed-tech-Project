const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { cloudinaryConnect } = require("../config/cloudinary");

// create subsection
exports.createSubSection = async (req, res) => {
  try {
    // data fetch
    const { title, timeDuration, description, sectionId } = req.body;

    // extract video from req files
    const video = req.files.video;

    // data validation
    if (!title || !timeDuration || !description || !video || !sectionId) {
      return res.status(400).json({
        success: false,
        msg: "All Fields are required",
      });
    }

    // video upload to cloudinary and get the url
    const UploadedVideo = await cloudinaryConnect(
      video,
      process.env.FOLDER_NAME
    );

    // create subsection
    const newSubSection = await SubSection.create({
      title,
      timeDuration,
      description,
      videoUrl: UploadedVideo.secure_url,
    });

    // update section
    const updatedSection = await Section.findByIdAndUpdate(
      { sectionId },
      {
        $push: {
          subSection: newSubSection._id,
        },
      },
      { new: true }
    );

    // Populate the section and subsection
    const populatedSection = await updatedSection
      .populate("subSection")
      .execPopulate();
    console.log(populatedSection);

    // response
    return res.status(200).json({
      success: true,
      msg: "SubSection Created Successfully",
      data: populatedSection,
    });
  } catch (err) {
    console.log(`Error in createSubSection ${err}`);
    res.status(500).json(err);
  }
};

// update subsection
exports.updateSubSection = async (req, res) => {
  try {
    // fetch data
    const { subSectionId, title, timeDuration, description } = req.body;

    // data validation
    if (!subSectionId || !title || !timeDuration || !description) {
      return res.status(400).json({
        success: false,
        msg: "All Fields are required",
      });
    }

    // update subsection
    const updatedSubSection = await SubSection.findByIdAndUpdate(
      { _id: subSectionId },
      {
        title,
        timeDuration,
        description,
      },
      { new: true }
    );

    // response
    return res.status(200).json({
      success: true,
      msg: "SubSection Updated Successfully",
      data: updatedSubSection,
    });
  } catch (err) {
    console.log(`Error in updateSubSection ${err}`);
    res.status(500).json(err);
  }
};

// delete subsection
exports.deleteSubSection = async (req, res) => {
  try {
    // fetch data
    const { subSectionId } = req.body || req.params;

    // data validation
    if (!subSectionId) {
      return res.status(400).json({
        success: false,
        msg: "All Fields are required",
      });
    }

    // delete subsection
    await SubSection.findByIdAndDelete({ _id: subSectionId });

    // response
    return res.status(200).json({
      success: true,
      msg: "SubSection Deleted Successfully",
    });
  } catch (err) {
    console.log(`Error in deleteSubSection ${err}`);
    res.status(500).json(err);
  }
};
