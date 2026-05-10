import { upadateApplicationStatusService,getMyApplicationsService } from "../services/application.service.js";



export const upadateApplicationStatus = async(req,res)=>{
    try {
        const applicationId = req.params.applicationId;
        const {status} = req.body;
        const ownerId = req.user.userId;

        const data = {
            applicationId,
            status,
            ownerId
        }

        const updatedApplication = await upadateApplicationStatusService(data);

        res.status(200).json({
            success:true,
            message:`Application ${status} succesfully`,
            data:updatedApplication
        });
        
    } catch (error) {

        return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
        
    }
}

export const getMyApplications = async(req,res)=>{
    try {
       const appliedBy = req.user.userId;
       const myApplications = await getMyApplicationsService(appliedBy);
       
       res.status(200).json({
            success:true,
            message:"Applications fetched succesfully",
            data:myApplications
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
    }
}