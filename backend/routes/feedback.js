import express from "express";
import Feedback from "../models/Feedback.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;
  if (!message) return res.status(400).json({ msg: "Message required" });
  try {
    const fb = new Feedback({ name, email, message });
    await fb.save();
    res.json({ msg: "Thanks for feedback" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
