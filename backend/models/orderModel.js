import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // restaurantId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Restaurant",
    //   required: true,
    // },
    items: { type: Array, required: true },
    orderDate: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
    deliveryAmount: { type: Number, required: true },
    address: { type: Object, required: true },
    orderStatus: { type: String, default: "Food Processing" },
    payment: { type: Boolean, default: false },
    paymentMethod: { type: String, required: true },
    deliveryPartnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "deliveryusers",
    },
  },
  { minimize: false, timestamps: true }
);

const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
