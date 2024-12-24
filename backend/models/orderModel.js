import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: { type: Array, required: true },
    orderDate: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
    deliveryAmount: { type: Number, required: true },
    address: { type: Object, required: true },
    orderStatus: {
      type: String,
      enum: [
        "ordered",
        "processing",
        "waiting for delivery boy",
        "picked up by delivery boy",
        "cancelled by restaurant",
      ],
      default: "ordered",
    },
    payment: { type: Boolean, default: false },
    paymentMethod: { type: String, required: true },
    deliveryPartnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "deliveryusers",
    },
    // expiresAt: {
    //   type: Date,
    //   required: true,
    //   default: () => Date.now() + 15 * 60 * 1000, // 15 mins from creation
    // },
  },
  { minimize: false, timestamps: true }
);

// Create TTL index
// orderSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
