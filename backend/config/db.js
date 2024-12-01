import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const DB = process.env.MONGODB;

export const connectDB = async () => {
    try {
        await mongoose.connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("DB Connected");
    } catch (error) {
        console.error("Error connecting to DB:", error.message);
        process.exit(1);
    }
};







// import mongoose from "mongoose";
// const DB = process.env.MONGODB;


// export const connectDB = async () => {
//     await mongoose.connect(DB).then(()=>console.log("DB Connected"));
// }