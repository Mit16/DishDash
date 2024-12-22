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

    ordersAssigned: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "order",
      default: [],
    }, // Array of assigned orders
    totalEarnings: { type: Number, default: 0 }, // Lifetime earnings
    phoneNumber: {
      type: Number,
      minlength: [10, "Phone number must be 10 digits"],
    },
    dateOfBirth: { type: Date },
    gender: { type: Boolean },
    street: { type: String },
    city: { typr: String },
    state: { type: String },
    district: { type: String },
    zipcode: { type: Number },
    govId: { type: String },
    drivingLicense: { type: String },
    vehicleType: { type: String },
    vehicleNumber: { type: String },
    vehicleInsurance: { type: String },
    bankName: { type: String },
    accountNumber: { type: Number },
    accountHolderName: { type: String },
    ifscCode: { type: String },
    deliveryArea: { type: String },
    profileCompleted: { type: Boolean, default: false }

  },
  { minimize: false }
);

const deliveryGuyModel =
  mongoose.models.deliveryusers ||
  mongoose.model("deliveryusers", deliveryGuySchema);

export default deliveryGuyModel;

// dailyEarnings: { type: Number, default: 0 }, // For current day's earnings
// weeklyEarnings: { type: Number, default: 0 }, // For current week's earnings
// monthlyEarnings: { type: Number, default: 0 }, // For current month's earnings

// earningsHistory: [
//   {
//     date: { type: Date, required: true }, // Record date
//     dailyTotal: { type: Number }, // Daily earnings on this date
//     weeklyTotal: { type: Number }, // Weekly earnings at the end of the week
//     monthlyTotal: { type: Number }, // Monthly earnings at the end of the month
//   },
// ],
