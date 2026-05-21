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

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "15m",
  });

  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  });

  const safeUser = user.toObject();
  delete safeUser.password;

  delete safeUser.__v;

  safeUser.id = safeUser._id.toString();
  delete safeUser._id;

  return { accessToken, refreshToken, user: safeUser };
};

export const refreshTokenService = async (clientRefreshToken) => {
  if (!process.env.JWT_SECRET || !process.env.JWT_REFRESH_SECRET) {
    throw new Error("Critical Server Error: JWT secrets are not defined.");
  }

  if (!clientRefreshToken) {
    throw new AppError("Refresh token is required!", 401);
  }

  const decoded = jwt.verify(
    clientRefreshToken,
    process.env.JWT_REFRESH_SECRET,
  );
  const payload = {
    userId: decoded.userId,
    role: decoded.role,
  };

  const newAccessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "15m",
  });

  return { accessToken: newAccessToken };
};

export const googleCallbackService = (user) => {
  const payload = {
    userId: user._id,
    role: user.role,
  };

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "15m",
  });

  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  });
  const needsOnboarding = !user.isOnboarded;

  const data = {
    needsOnboarding: needsOnboarding,
    accessToken,
    refreshToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      provider: user.provider,
    },
  };

  return data;
};

export const completeProfileService = async (role, userId) => {
  if (!["student", "business"].includes(role)) {
    throw new AppError("Invalid role. Must be student or business", 400);
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }
  if (user.isOnboarded) {
    throw new AppError("User is already onboarded", 400);
  }

  user.role = role;
  user.isOnboarded = true;
  await user.save();
  
  const payload = { 
  userId: user._id, 
  role: user.role 
};

const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
  expiresIn: process.env.JWT_EXPIRES_IN || "15m",
});

const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
  expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
});

return { user, accessToken, refreshToken };
};

export const getMeService = async (userId) => {
  const user = await User.findById(userId).select("-password");
  if (!user) {
    throw new AppError("User not found", 404);
  }
  const safeUser = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    provider: user.provider,
    isOnboarded: user.isOnboarded,
  };
  return safeUser;
};
