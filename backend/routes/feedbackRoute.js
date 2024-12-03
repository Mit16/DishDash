import express from "express";
import {
  addFeedback,
  getFeedbacks,
} from "../controllers/feedbackController.js";

const feedbackrouter = express.Router();

// Route to add feedback
feedbackrouter.post("/", addFeedback);

// Route to get all feedback (optional, for admin)
feedbackrouter.get("/", getFeedbacks);

export default feedbackrouter;
