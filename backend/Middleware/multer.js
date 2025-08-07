// backend/multerConfig.js
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure folder exists
const tempPath = path.join(__dirname, "public", "temp");
if (!fs.existsSync(tempPath)) {
  fs.mkdirSync(tempPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempPath); // absolute path
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}_${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage }); // ✅ diskStorage now used

module.exports = { upload };
