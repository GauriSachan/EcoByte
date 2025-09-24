import express from "express";
import auth from "../middleware/auth.js";
import { upload } from "../utils/multerConfig.js";
import Item from "../models/Item.js";
const router = express.Router();

// list items
router.get("/", async (req, res) => {
  const items = await Item.find().populate("seller", "username avatar");
  res.json(items);
});

// get item
router.get("/:id", async (req, res) => {
  const item = await Item.findById(req.params.id).populate("seller", "username avatar");
  if (!item) return res.status(404).json({ msg: "Not found" });
  res.json(item);
});

// create new item (supports multiple images)
router.post("/", auth, upload.array("images", 6), async (req, res) => {
  try {
    const { title, description, price } = req.body;
    const images = (req.files || []).map(f => `/${f.path}`);
    const item = new Item({ title, description, price, images, seller: req.user._id });
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// delete item (seller only)
router.delete("/:id", auth, async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item) return res.status(404).json({ msg: "Not found" });
  if (item.seller.toString() !== req.user._id.toString()) return res.status(403).json({ msg: "Not allowed" });
  await item.remove();
  res.json({ msg: "Deleted" });
});

export default router;
