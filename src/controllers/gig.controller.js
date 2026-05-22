import {
  createGigService,
  getGigsService,
  createApplicationService,
  getGigApplicationsService,
  getMyGigsService,
  getGigDetailsService,
} from "../services/gig.service.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";

export const createGig = asyncHandler(async (req, res) => {
  const ownerId = req.user.userId;
  const gigData = {
    ...req.validatedData,
    ownerId,
  };

  const gig = await createGigService(gigData);

  return res.status(201).json({
    success: true,
    message: "Gig created succesfully",
    data: gig,
  });
});

export const getGigs = asyncHandler(async (req, res) => {
  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 10;

  const search = req.query.search;
  let sortOption = { createdAt:-1}
  const sort = req.query.sort;
  if(sort === "price_asc"){
    sortOption = {price:1};
  }else if(sort === "price_desc"){
    sortOption = {price:-1};
  }else if(sort === "newest"){
    sortOption = { createdAt: -1}
  }else if(sort === "oldest"){
    sortOption = { createdAt:1}
  }else{
    sortOption = { createdAt:-1}
  }

  let filters = { status:"open"};
  if(req.query.skill){
    filters.skillsRequired = req.query.skill;
  }
  if(search){
    filters.$or = [
     {title: {$regex:search,$options:"i"}},
     {description:{$regex:search,$options:"i"}}
    ]
  }

  const { gigs,pagination} = await getGigsService(page,limit,filters,sortOption);

  return res.status(200).json({
    success: true,
    message: "Gigs fetched successfully",
    data: gigs,
    pagination
  });
});

export const createApplication = asyncHandler(async (req, res) => {
  const gigId = req.params.gigId;
  const appliedBy = req.user.userId;
  const {proposal} = req.body;

  const applicationData = {
    gigId,
    appliedBy,
    proposal,
  };

  const application = await createApplicationService(applicationData);

  return res.status(201).json({
    success: true,
    message: "Applied for the gig succesfully",
    data: application,
  });
});

export const getApplications = asyncHandler(async (req, res) => {
  const applications = await getGigApplicationsService(
    req.params.gigId,
    req.user.userId,
  );

  return res.status(200).json({
    success: true,
    message: "Applications are fetched successfully",
    data: applications,
  });
});

export const getMyGigs = asyncHandler(async (req, res) => {
  const ownerId = req.user.userId;
  const myGigs = await getMyGigsService(ownerId);
  res.status(200).json({
    success: true,
    message: "fetched all the gigs of owner",
    data: myGigs,
  });
});

export const getGigDetails = asyncHandler(async (req, res) => {
  const gigId = req.params.gigId;

  const gig = await getGigDetailsService(gigId);

  res.status(200).json({
    success: true,
    message: "fetched gig details succesfully",
    data: gig,
  });
});
