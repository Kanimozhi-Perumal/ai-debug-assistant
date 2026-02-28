import express from "express";
import { debugCode } from "../controllers/debugController.js";
import History from "../models/History.js";

const router = express.Router();

// Debug code
router.post("/", debugCode);

// Get all history
router.get("/history", async (req, res) => {
  try {
    const history = await History.find().sort({ createdAt: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

// Get single debug by ID
router.get("/history/:id", async (req, res) => {
  try {
    const item = await History.findById(req.params.id);
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch item" });
  }
});

export default router;