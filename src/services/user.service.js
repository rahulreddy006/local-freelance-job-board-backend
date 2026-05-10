import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { AppError } from "../utils/error.util.js";
import jwt from "jsonwebtoken";

export const createUser = async (userData) => {
  const { name, email, password, role } = userData;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("User with this email already exists", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  const userResponce = user.toObject();

  delete userResponce.password;

  return userResponce;
};

export const loginUserService = async (data) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("Critical Server Error: JWT_SECRET is not defined.");
  }
  const user = await User.findOne({ email: data.email });
  if (!user) {
    throw new AppError("User not found", 401);
  }
  const comparePassword = await bcrypt.compare(data.password, user.password);

  if (!comparePassword) {
    throw new AppError("Incorrect Password", 401);
  }

  const payload = {
    userId: user._id,
    role: user.role,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

  const safeUser = user.toObject();
  delete safeUser.password;

  delete safeUser.__v;

  safeUser.id = safeUser._id.toString();
  delete safeUser._id;

  return { token, user: safeUser };
};
