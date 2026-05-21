import { success } from "zod";
import { createUser, loginUserService,refreshTokenService,googleCallbackService,completeProfileService,getMeService } from "../services/user.service.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";

export const registerUser = asyncHandler(async (req, res) => {
  const data = await createUser(req.validatedData);

  res.status(201).json({
    success: true,
    message: "Successfully registered",
    data,
    error: null,
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const data = await loginUserService(req.validatedData);

  return res.status(200).json({
    success: true,
    message: "Logged in successfully",
    data,
  });
});

export const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken: clientRefreshToken } = req.body;
  const result = await refreshTokenService(clientRefreshToken);

  res.status(200).json({
    message: "Token refreshed successfully",
    accessToken: result.accessToken,
  });
});

export const googleCallback = asyncHandler((req,res)=>{
  const user = req.user;
  const data = googleCallbackService(user);
  res.status(200).res.redirect(
 `${process.env.FRONTEND_URL}/oauth-success?accessToken=${data.accessToken}&refreshToken=${data.refreshToken}&needsOnboarding=${data.needsOnboarding}`
);
});

export const completeProfile = asyncHandler( async(req,res)=>{
  const {role} = req.body;

  const userId = req.user.userId;

  const user = await completeProfileService(role,userId);

  res.status(200).json({
    success:true,
    message:"Onboarding complete! welcome aboard",
    user:user
  });
})

export const getMe = asyncHandler( async (req,res)=>{
  const userId = req.user.userId;
  const user = await getMeService(userId);
  res.status(200).json({
    success:true,
    user:user
  })})
