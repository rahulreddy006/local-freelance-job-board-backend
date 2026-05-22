import { Application } from "../models/application.model.js";
import {Gig} from "../models/gig.model.js";
import { AppError } from "../utils/error.util.js";
import mongoose from "mongoose";

export const createGigService = async (gigData) => {
  const gig = await Gig.create(gigData);

  const safeGig = gig.toObject();

  delete safeGig.__v;
  return safeGig;
}

export const getGigsService = async(page,limit,filters,sortOption) => {
  if(page < 1) page = 1;
  if(isNaN(page)) page =1;

  if(limit < 1) limit = 10;
  if(limit > 50) limit = 50;
  if(isNaN(limit)) limit = 10;

  const skip = (page - 1) * limit;
  const totalGigs = await Gig.countDocuments(filters);
  const totalPages = Math.ceil(totalGigs/limit);

  const gigs = await Gig.find(filters).sort(sortOption).skip(skip).limit(limit);
  const pagination = {
    page,limit,totalPages,totalGigs
  }

  return {gigs,pagination};
}

export const createApplicationService = async(data) =>{
  const validFormat = mongoose.Types.ObjectId.isValid(data.gigId);
  if(!validFormat){
    throw new AppError("Invalid Gig Id",400);
  }

  const gigExists = await Gig.findById(data.gigId);

  if(!gigExists){
    throw new AppError("Gig does not exists",404);
  }


  if(data.appliedBy === gigExists.ownerId.toString()){
    throw new AppError("Owner cant apply to his own gig", 403);
  }

  const existingApplication = await Application.findOne({
    gigId:data.gigId,
    appliedBy:data.appliedBy
  });

  if(existingApplication){
    throw new AppError("Cannot apply twice to a single Gig", 409);
  }

  const  application  = await Application.create({
    gigId:data.gigId,
    appliedBy:data.appliedBy,
    proposal:data.proposal
  });

  return application;
}


export const getGigApplicationsService = async(gigId,userId)=>{
  const validFormat = mongoose.Types.ObjectId.isValid(gigId);
  if(!validFormat){
    throw new AppError("Invalid Gig Id",400);
  }
  
 const gigExists = await Gig.findById(gigId);

  if(!gigExists){
    throw new AppError("Gig does not exist",404);
  }

if(gigExists.ownerId.toString() !== userId.toString()){
    throw new AppError("You are not auothorized to see apllications", 403);
}

const applications = await Application.find({gigId}).populate("appliedBy","name email");

return applications;

}

export const getMyGigsService = async(ownerId)=>{

  const myGigs = await Gig.find({ownerId}).sort({createdAt:-1});

  return myGigs;
}

export const getGigDetailsService = async(gigId)=>{
  const validFormat = mongoose.Types.ObjectId.isValid(gigId);
  if(!validFormat){
    throw new AppError("GigId is not valid",400);
  }

  const gig =  await Gig.findById(gigId).populate("ownerId","name");

  if(!gig){
    throw new AppError("Gig does not exist",404)
  }
  
  const applicationCount = await Application.countDocuments({gigId});

  const data = {
    gig,
    applicationCount
  }

  return data;


}