import express from "express";
import { registerUser, loginUser,refreshToken,googleCallback,completeProfile } from "../controllers/auth.controller.js";
import { registerSchema, loginSchema } from "../validators/auth.validator.js";
import { validate } from "../middlewares/validator.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import passport from "passport";

const router = express.Router();

router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);
router.post('/refresh-token',refreshToken);
router.get('/auth/google',
  passport.authenticate('google', { 
    scope: ['profile', 'email'], 
    prompt: 'select_account' // Forces Google to show the account selector
  })
);
router.get('/auth/google/callback', 
  passport.authenticate('google', { session: false }), googleCallback);

router.patch("/complete-profile",authMiddleware,completeProfile)

export default router;
