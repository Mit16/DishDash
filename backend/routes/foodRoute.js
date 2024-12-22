import express from "express";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import {
  addFood,
  listFood,
  removeFood,
} from "../controllers/foodController.js";
import multer from "multer";
import cloudinary from "../config/cloudinaryConfig.js";

const foodRouter = express.Router();

//Image Storage Engine

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "foodUploads", // Folder name in your Cloudinary account
    allowed_formats: ["jpg", "png", "jpeg"], // Allowed file formats
  },
});


const uploads = multer({ storage: storage });

foodRouter.post("/add", uploads.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);

export default foodRouter;

// const storage = multer.diskStorage({
//   destination: "uploads",
//   filename: (req, fie, cb) => {
//     return cd(null, `${Date.now()}${file.originalname}`);
//   },
// });