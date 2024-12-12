import mongoose from "mongoose";

const deliveryGuySchema = new mongoose.Schema(
  {
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
    accountType: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    deliveryId: { type: String },
    personalInfo: {
      dateOfBirth: { type: Date },
      gender: { type: Boolean },
      phoneNumber: {
        type: Number,
        minlength: [10, "Phone number must be 10 digits"],
      },
    },
    addressInfo: {
      street: { type: String },
      city: { typr: String },
      state: { type: String },
      district: { type: String },
      zipcode: { type: Number },
    },
    identityVerification: {
      govId: { type: String },
      drivingLicense: { type: String },
    },
    vehicleInfo: {
      vehicleType: { type: String },
      vehicleNumber: { type: String },
      vehicleInsurance: { type: String },
    },
    bankDetails: {
      bankName: { type: String },
      accountNumber: { type: Number },
      accountHolderName: { type: String },
      ifscCode: { type: String },
    },
    deliveryArea: { type: String },
  },
  { minimize: false }
);

const deliveryGuyModel =
  mongoose.model.user || mongoose.model("deliveryUser", deliveryGuySchema);

export default deliveryGuyModel;
