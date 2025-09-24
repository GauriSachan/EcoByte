import express from "express";
import auth from "../middleware/auth.js";
import { upload } from "../utils/multerConfig.js";
import User from "../models/User.js";

const router = express.Router();

// get me
router.get("/me", auth, async (req, res) => {
  res.json(req.user);
});

// update profile (including avatar)
router.put("/me", auth, upload.single("avatar"), async (req, res) => {
  try {
    const updates = {};
    if (req.body.username) updates.username = req.body.username;
    if (req.file) updates.avatar = `/${req.file.path}`; // e.g. /uploads/123.jpg

    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true }).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
