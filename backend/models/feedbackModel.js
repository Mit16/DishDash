import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      validate: {
        validator: (v) => /^\S+@\S+\.\S+$/.test(v),
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    feedback: {
      type: String,
      required: true,
    },
    response: {
      type: Boolean,
      required: true,
      default: false, // Assuming feedback is initially unaddressed
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

// Ensures the model is not redefined in development
const feedbackModel =
  mongoose.models.Feedback || mongoose.model("Feedback", feedbackSchema);

export default feedbackModel;
