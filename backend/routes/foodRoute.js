import express from "express";
import {
  addFood,
  listFood,
  removeFood,
} from "../controllers/foodController.js";
import multer from "multer";

const foodRouter = express.Router();

//Image Storage Engine

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, fie, cb) => {
    return cd(null, `${Date.now()}${file.originalname}`);
  },
});

const uploads = multer({ storage: storage });

foodRouter.post("/add", uploads.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);

export default foodRouter;
