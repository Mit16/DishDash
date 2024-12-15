import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";
import feedbackrouter from "./routes/feedbackRoute.js";
import orderRouter from "./routes/orderRoute.js";
import deliveryRouter from "./routes/deliveryRoute.js";
// import "./utils/ceonJobs.js"

//app config
const app = express();
const PORT = process.env.PORT;

//middleware
app.use(express.json());
app.use(cors());

//DB Connection
connectDB();

//api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/delivery", deliveryRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/feedback", feedbackrouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
