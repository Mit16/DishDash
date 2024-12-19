import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    deliveryAmount: { type: Number, required: true },
    customerDetails: {
      name: { type: String, required: true },
      phone1: { type: String, required: true },
      phone2: { type: String, required: true },
    },
    address: { type: Object, required: true },
    orderStatus: { type: String, default: "Ordered" },
    payment: { type: Boolean, default: false },
    deliveryBoy: {
      type: Object,
      default: {},
    },
  },
  { minimize: false, timestamps: true }
);

const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
