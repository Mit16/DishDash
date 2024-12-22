import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema(
  {
    deliveryPartnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DeliveryPartner",
      required: true,
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    pickupTime: { type: Date },
    deliveryTime: { type: Date },
    status: {
      type: String,
      enum: ["Pending", "Picked Up", "Delivered"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const deliveryModel = mongoose.model("Delivery", deliverySchema);

export default deliveryModel;
