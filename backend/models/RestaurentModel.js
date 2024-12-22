import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    restaurentName: { type: String },
    fullname: {
      firstname: {
        type: String,
        required: true,
        minlength: [3, "First name must be at least 3 characters long"],
      },
      lastname: {
        type: String,
        minlength: [3, "Last name must be at least 3 characters long"],
      },
    },

    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    accountType: { type: String, required: true },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipcode: { type: String },
      country: { type: String },
    },
    openingHours: {
      week: { start: String, end: String },
      Sunday: { start: String, end: String },
    },
    licenseNumber: { type: String },
    isActive: { type: Boolean, default: true },
    profileCompleted: { type: Boolean, default: false },
  },
  { timestamps: true, minimize: false }
);

const restaurentModel =
  mongoose.models.Restaurant || mongoose.model("Restaurant", restaurantSchema);

export default restaurentModel;
