import express from "express";
import upload from "../../../middlewares.js";

const router = express.Router();

router.post("/", upload.single("file"), async (req, res) => {
  try {
    console.log(req.file);
    res.status(200).json({
      success: true,
      url: req.file.path, // Cloudinary URL
      public_id: req.file.filename,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
