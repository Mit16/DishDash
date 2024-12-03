import feedbackModel from "../models/feedbackModel.js";

// Add Feedback
const addFeedback = async (req, res) => {
  const { email, feedback, response } = req.body;

  if (!email || !feedback) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required." });
  }

  try {
    const newFeedback = new feedbackModel({ email, feedback, response });
    await newFeedback.save();
    res
      .status(201)
      .json({ success: true, message: "Feedback submitted successfully." });
  } catch (error) {
    console.error("Error adding feedback:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// Get Feedbacks (Admin only, optional)
const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await feedbackModel.find();
    res.status(200).json({ success: true, feedbacks });
  } catch (error) {
    console.error("Error retrieving feedbacks:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export { addFeedback, getFeedbacks };
