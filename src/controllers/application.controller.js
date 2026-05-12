import {
  upadateApplicationStatusService,
  getMyApplicationsService,
} from "../services/application.service.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";

export const upadateApplicationStatus = asyncHandler(async (req, res) => {
  const applicationId = req.params.applicationId;
  const { status } = req.body;
  const ownerId = req.user.userId;

  const data = {
    applicationId,
    status,
    ownerId,
  };

  const updatedApplication = await upadateApplicationStatusService(data);

  res.status(200).json({
    success: true,
    message: `Application ${status} succesfully`,
    data: updatedApplication,
  });
});

export const getMyApplications = asyncHandler(async (req, res) => {
  const appliedBy = req.user.userId;
  const myApplications = await getMyApplicationsService(appliedBy);

  res.status(200).json({
    success: true,
    message: "Applications fetched succesfully",
    data: myApplications,
  });
});
