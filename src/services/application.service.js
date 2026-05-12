import { Application } from "../models/application.model.js";
import { Gig } from "../models/gig.model.js";
import { AppError } from "../utils/error.util.js";
import mongoose from "mongoose";

export const upadateApplicationStatusService = async (data) => {
  const validFormat = mongoose.Types.ObjectId.isValid(data.applicationId);
  if (!validFormat) {
    throw new AppError("Invalid Application Id", 400);
  }

  const allowedStatuses = ["accepted", "rejected"];
  if (!allowedStatuses.includes(data.status)) {
    throw new AppError("Invalid status. Must be 'accepted' or 'rejected'", 400);
  }

  const application = await Application.findById(data.applicationId);
  if (!application) {
    throw new AppError("Application does not exist", 404);
  }

  if (application.status !== "pending") {
    throw new AppError("Application is already updated", 409);
  }

  const gig = await Gig.findById(application.gigId);

  if (!gig) {
    throw new AppError("Gig does not exist", 404);
  }

  if (gig.ownerId.toString() !== data.ownerId) {
    throw new AppError("Unauthorized access", 403);
  }

  application.status = data.status;
  const updatedApplication = await application.save();

  if (updatedApplication.status === "accepted") {
    await Application.updateMany(
      { gigId: gig._id, _id: { $ne: application._id }, status: "pending" },
      { status: "rejected" },
    );

    gig.status = "in-progress";
    await gig.save();
  }

  return updatedApplication;
};

export const getMyApplicationsService = async (appliedBy) => {
  const myApplications = await Application.find({ appliedBy })
    .populate("gigId", "title price status deadline")
    .sort({ createdAt: -1 });
  return myApplications;
};
