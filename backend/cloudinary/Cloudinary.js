const fs = require("fs");
const { v2: cloudinary } = require("cloudinary");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) throw new Error("Missing file path");

    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "courses",
    });

    fs.unlinkSync(localFilePath);
    return result;
  } catch (error) {
    console.error("Cloudinary upload failed:", error.message);
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    throw error;
  }
};

module.exports = { uploadOnCloudinary };
