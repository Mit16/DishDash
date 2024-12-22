import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    categoryName: { type: String, required: true, lowercase: true, trim: true },
    dishes: [
      {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true },
        availability: { type: Boolean, default: true },
      },
    ],
  },
  { timestamps: true }
);

const menuModel = mongoose.models.Menu || mongoose.model("Menu", menuSchema);

export default menuModel;
