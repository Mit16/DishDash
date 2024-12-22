import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      firstname: {
        type: String,
        required: true,
        minlength: [3, "First name must be at least3 charcter long"],
      },
      lastname: {
        type: String,
        minlength: [3, "Last name must be at least 3 character long"],
      },
    },
    accountType: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: {
      phone1: { type: String, minlength: 10, maxlength: 15 }, // Phone added
      phone2: { type: String, minlength: 10, maxlength: 15 }, // Phone added
    },
    address: { type: Object, default: {} },
    cartData: { type: Object, default: {} },
    // cartData: { type: Map, of: Number, default: {} }, // Use Map for better key-value handling
    profileCompleted: { type: Boolean, default: false },
  },
  { minimize: false }
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
