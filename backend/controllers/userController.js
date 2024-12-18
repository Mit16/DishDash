import userModel from "../models/userModel.js";
import deliveryGuyModel from "../models/deliveryModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//login user
const loginUser = async (req, res) => {
  const { email, password, accountType } = req.body;

  try {
    const Model = getModel(accountType);
    if (!Model) {
      return res.json({ success: false, message: "Invalid account type" });
    }

    const user = await Model.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User doesn't exist. Create an account!",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Server error occurred" });
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

//register user
const registerUser = async (req, res) => {
  const { fullname, password, confirmPassword, email, accountType } = req.body;

  try {
    // Validate required fields dynamically
    if (
      !fullname ||
      !fullname.firstname ||
      !email ||
      !password ||
      !accountType
    ) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    //checking if the user exists
    const Model = getModel(accountType);
    if (!Model) {
      return res.json({ success: false, message: "Invalid account type" });
    }

    const exists = await Model.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "Account already exists" });
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // Validate password strength
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.json({
        success: false,
        message:
          "Password must be strong (8+ chars, include uppercase, lowercase, number, special char)",
      });
    }

    // password match
    if (password !== confirmPassword) {
      return res.json({ success: false, message: "Passwords do not match" });
    }

    //we are creating a account and encrypting the password { hashing user password}
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user with the correctly structured data

    const newUser = new Model({
      fullname: {
        firstname: fullname.firstname,
        lastname: fullname.lastname || "",
      },
      accountType,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    //Generate JWT token
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Server error occurred" });
  }
};

const updateUserDetails = async (req, res) => {
  try {
    const { userId, address, phone } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    // Find the user by ID and update fields
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          phone: {
            phone1: phone.phone1,
            phone2: phone.phone2,
          },
          address,
        },
      },
      { new: true, runValidators: true } // Return updated document and run schema validators
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user details:", error);
    res.status(500).json({ success: false, message: "Server error occurred" });
  }
};

// Fetch user details
const getUserDetails = async (req, res) => {
  try {
    const userId = req.user._id; // Extracted from JWT token

    const user = await userModel
      .findById(userId)
      .select("fullname email phone address");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ success: false, message: "Server error occurred" });
  }
};

// Helper function to determine the model based on accountType
const getModel = (accountType) => {
  if (accountType === "Consumer") return userModel;
  if (accountType === "Delivery") return deliveryGuyModel;
  return null;
};

export { loginUser, registerUser, updateUserDetails, getUserDetails };
