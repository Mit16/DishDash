import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://amitkvishwa1633:Y94bUsaU0GIhLURb@food-zzz.yue0y.mongodb.net/Food-Zzz').then(()=>console.log("DB Connected"));
}