import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    dishId: { type: mongoose.Schema.Types.ObjectId, ref: "Menu.dishes" },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
    reviewDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const customerReviewModel =
  mongoose.model.Review || mongoose.model("Review", reviewSchema);

export default customerReviewModel;
