import { createUser } from "../services/user.service.js";


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