import mongoose from "mongoose";


export const connectDB = async() => {
    try {
        mongoose.connect(process.env.MONGO_URI)
      .then(() => console.log('Connected!'));
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }

}