import { success } from "zod";
import { createGigService,getGigsService,createApplicationService,getGigApplicationsService,getMyGigsService ,getGigDetailsService} from "../services/gig.service.js";

export const createGig = async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

export const getGigs = async (req, res) => {
  try {
    const gigs = await getGigsService();

    return res.status(200).json({
      success: true,
      message:"Gigs fetched successfully",
      data: gigs,
    });
  } catch (error) {}
};

export const createApplication = async (req,res) => {
    try {
        const gigId = req.params.gigId;
    const appliedBy = req.user.userId;

    const applicationData = {
        gigId,
        appliedBy
    }

    const application = await createApplicationService(applicationData);

    return res.status(201).json({
        success:true,
        message:"Applied for the gig succesfully",
        data:application
    });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
    }
    
}

export const getApplications = async(req,res)=>{
  try {
     const applications = await getGigApplicationsService(req.params.gigId,req.user.userId);

      return res.status(200).json({
        success:true,
        message:"Applications are fetched successfully",
        data:applications
    });

  } catch (error) {
     return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
    
  }
}

export const getMyGigs = async(req,res)=>{
  try {
    const ownerId = req.user.userId;
    const myGigs = await getMyGigsService(ownerId);
    res.status(200).json({
      success:true,
      message:"fetched all the gigs of owner",
      data:myGigs
    })
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success:false,
      message:error.message || "Internal server error"
    })
  }
}

export const getGigDetails = async(req,res)=>{
  try {
    const gigId = req.params.gigId;

  const gig = await getGigDetailsService(gigId);

  res.status(200).json({
    success:true,
    message:"fetched gig details succesfully",
    data:gig
  })
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success:false,
      message:error.message || "Internal server error"
    });
    
  }
  
}