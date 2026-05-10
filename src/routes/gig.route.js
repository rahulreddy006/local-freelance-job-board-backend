import express from "express";
import { authMiddleware,authorizeRoles } from "../middlewares/auth.middleware.js";
import { createGig,getGigs,createApplication,getApplications,getMyGigs,getGigDetails } from "../controllers/gig.controller.js";
import { validate } from "../middlewares/validator.middleware.js";
import { createGigSchema } from "../validators/gig.validator.js";

const router = express.Router();

router.post("/gigs",authMiddleware,authorizeRoles("business"),validate(createGigSchema),createGig);
router.get("/gigs",getGigs);
router.post("/gigs/:gigId/apply",authMiddleware,authorizeRoles("student"),createApplication);
router.get("/gigs/:gigId/applications",authMiddleware,authorizeRoles("business"),getApplications);
router.get("/my-gigs",authMiddleware,authorizeRoles("business"),getMyGigs)
router.get("/gigs/:gigId",getGigDetails);

export default router;