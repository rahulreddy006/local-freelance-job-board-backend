import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { AppError } from "../utils/error.util.js";

export const createUser = async(userData) => {
        const {name,email,password,role} = userData;
        
        const existingUser = await User.findOne({email});
        if(existingUser){
              throw new AppError("User with this email already exists",409);
        }

       const hashedPassword = await bcrypt.hash(password,10);

         const user = await User.create({
            name,
            email,
            password:hashedPassword,
            role
        });

        const userResponce = user.toObject();

        delete userResponce.password;

        return userResponce;
}