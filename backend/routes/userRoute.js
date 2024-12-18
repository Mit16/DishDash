import express from "express";
import {
  loginUser,
  registerUser,
  updateUserDetails,
  getUserDetails,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/authication.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/profile", authMiddleware(["customer"]), updateUserDetails);
userRouter.get("/details", authMiddleware(["customer"]), getUserDetails);

export default userRouter;
