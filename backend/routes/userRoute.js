import express from "express";
import {
  loginUser,
  registerUser,
  updateUserDetails,
  getUserDetails,
} from "../controllers/userController.js";
import { updateOrderStatus } from "../controllers/deliveryController.js";
import authMiddleware from "../middleware/authication.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/profile", authMiddleware, updateUserDetails);
userRouter.get("/details", authMiddleware, getUserDetails);
userRouter.post("/status", authMiddleware, updateOrderStatus);

export default userRouter;
