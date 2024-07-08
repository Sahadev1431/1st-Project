import mongoose from "mongoose";

export const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            dbName : "HOSPITAL_MANAGEMENT_SYSTEM_MERN"
        })
        console.log("Database connected successfully");
    } catch (err) {
        console.log(`Error while connecting database ${err}`);
    }
}