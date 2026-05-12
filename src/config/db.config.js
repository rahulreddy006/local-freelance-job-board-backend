import mongoose from "mongoose";
import logger from "./logger.config.js";


export const connectDB = async() => {
    try {
        mongoose.connect(process.env.MONGO_URI)
      .then(() => logger.info('Connected!'));
    } catch (error) {
        logger.error('Error connecting to MongoDB:', error);
    }

}