const express = require("express");
const multer = require("multer");
const router = express.Router();
const path = require("path");

// Save files to disk
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// UPLOAD FILE
router.post("/upload", upload.single("image"), (req, res) => {
  res.json({
    action: "upload_image",
    status: "success",
    file: req.file
  });
});

// SHOW IMAGE
router.get("/image/:name", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "uploads", req.params.name));
});

module.exports = router;
