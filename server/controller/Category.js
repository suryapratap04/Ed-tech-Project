const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  try {
    // fetch data
    const { name, description } = req.body;

    // validation
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        msg: " all Field is required",
      });
    }

    // create Entry in DB
    const category = await Category.create({
      name,
      description,
    });

    // response
    return res.status(200).json({
      success: true,
      msg: "Tag Created Successfully",
      data: category,
    });
  } catch (error) {
    console.log(`Error in createTag ${error}`);
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
};

exports.showAllCategory = async (req, res) => {
  try {
    const tags = await Category.find({}, { name, description });
    return res.status(200).json({
      success: true,
      data: category,
      message: "All Category Return Successfully",
    });
  } catch (error) {
    console.log(`Error in showAllTags ${error}`);
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
};

exports.categoryPageDetails = async (request, response) => {
  try {
    const { categoryId } = request.body;
    if (!categoryId) {
      return response.status(400).json({
        success: false,
        message: "Category Id is required",
      });
    }

    const categoryCourses = await Category.findById(categoryId)
      .populate("course")
      .exec();
    if (!categoryCourses) {
      return response.status(404).json({
        success: false,
        message: "Course Not Found",
      });
    }

    // get courses for differenr categories
    const categoryDifferentCourses = await Category.findById({
      _id: { $ne: categoryId },
    })
      .populate("course")
      .exec();

    // top selling Course
    const topSellingCourse = await Category({
      _id: categoryId,
    })
      .populate({
        path: "course",
        options: { sort: { studentsEnrolled: -1 } },
      })
      .exec();

    return response.status(200).json({
      success: true,
      message: "Category Details",
      data: {
        categoryCourses,
        categoryDifferentCourses,
        topSellingCourse,
      },
    });
  } catch (error) {
    console.log(`Error in categoryPageDetails ${error}`);
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
};
