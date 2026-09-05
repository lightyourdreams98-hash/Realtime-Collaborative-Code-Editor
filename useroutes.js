import express from "express";
import axios from "axios";
import UserAnalytics from "../models/UserAnalytics.js";

const router = express.Router();

// Get clusters from Python ML API
router.get("/cluster", async (req, res) => {
  const { data } = await axios.get("[localhost](http://localhost:5001/cluster)");
  res.json(data);
});

// Predict user behavior
router.post("/predict", async (req, res) => {
  const { data } = await axios.post("[localhost](http://localhost:5001/predict)", req.body);
  res.json(data);
});

export default router;
