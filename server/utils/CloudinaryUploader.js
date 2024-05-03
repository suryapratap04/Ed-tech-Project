const Cloudinary = require("cloudinary").v2;

exports.cloudinaryConnect = async (file, folder, height, quality) => {
  try {
    const options = { folder };
    if (height) {
      options.height = height;
    }
    if (quality) {
      options.quality = quality;
    }
    options.resourse_type = "auto";

    return await Cloudinary.uploader.upload(file.tempFilePath, options);
    // return await Cloudinary.uploader.upload(file, options);
  } catch (error) {
    console.log("Error in uploading to Cloudinary", error.messagez);
    console.error(error);
    // return response.status(500).json({
    //   success: false,
    //   msg: "Insternal Server Error",
    // });
  }
};
