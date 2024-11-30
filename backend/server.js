import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";

//app config
const app = express();
const PORT = 3000;

//middleware
app.use(express.json());
app.use(cors());

//DB Connection
connectDB();


//api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static("uploads"))


app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
