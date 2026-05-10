import express from "express";
import { authMiddleware,authorizeRoles } from "../middlewares/auth.middleware.js";
import {upadateApplicationStatus,getMyApplications} from "../controllers/application.controller.js"

const router = express.Router();

router.patch("/applications/:applicationId/status",authMiddleware,authorizeRoles("business"),upadateApplicationStatus);
router.get("/my-applications",authMiddleware,authorizeRoles("student"),getMyApplications);

export default router;