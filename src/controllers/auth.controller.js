import { createUser,loginUserService } from "../services/user.service.js";


export const registerUser = async(req,res)=>{
    try {
    const data = await createUser(req.validatedData);

    res.status(201).json({
    success :true,
    "message":"Successfully registered",
    data,
    error:null
    
   })
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            success:false,
            message:error.message || "Internal server error"
        })
        
    }
  
}

export const loginUser = async(req,res)=>{
    try {
        const data = await loginUserService(req.validatedData);

        return res.status(200).json({
            success:true,
            message:"Logged in successfully",
            data
        })
        
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            success:false,
            message:error.message || "Internal server error"
        })
        
    }
}

