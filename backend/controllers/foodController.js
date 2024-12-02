import { console } from "inspector";
import foodModel from "../models/foodModel.js";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

//add food  item

const addFood = async (req, res) => {
  let imageUrl = req.file.path;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: imageUrl,
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//all food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//remove food item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);

    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food not found" });
    }

    // Delete the image from Cloudinary
    if (food.image) {
      // Extract the public_id from the Cloudinary URL
      const imagePublicId = food.image.split("/").slice(-2, -1)[0]; // Get the public ID (before file extension)

      console.log("Deleting Cloudinary image with public_id:", imagePublicId); // Log the public_id for debugging

      // Destroy the image from Cloudinary using the extracted public_id
      const cloudinaryResponse = await cloudinary.uploader.destroy(
        imagePublicId
      );
      console.log("Cloudinary Response:", cloudinaryResponse); // Log Cloudinary's response for debugging
    }

    // Delete the food item from MongoDB
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food item deleted successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Server Error" });
  }
};

export { addFood, listFood, removeFood };
