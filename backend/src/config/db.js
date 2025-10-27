import mongoose from "mongoose";
import config from "./config.js";


const connectDB = async () => {
            try {
                        const connect = await mongoose.connect(config.MONGO_URI);
                        if (connect.connection.readyState === 1) {
                                    console.log("Database is connected!")
                        } else {
                                    console.log("Database is not connected!")
                        }
            } catch (error) {
                        console.log("DB error", error)
            }
}

export default connectDB;