import jwt from "jsonwebtoken";
import { success } from "zod";

export const authMiddleware = (req,res,next) => {
    
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(401).json({
                success:false,
                message:"Access denied. No token provided"
            })
        }

        const token = authHeader.split(" ")[1];

    try {

        const decodedPayload = jwt.verify(token,process.env.JWT_SECRET);

        req.user = {
            userId:decodedPayload.userId,
            role:decodedPayload.role
        }

       return next();

    } catch (error) {
        return res.status(403).json({
            success:false,
            message:"Unauthorized access"
        })
    }
}

export const authorizeRoles = (...allowedRoles) => (req,res,next) =>{
    if(!req.user || !req.user.role){
        return res.status(401).json({
            success:false,
            message:"Access denied. User not authenticated or role missing."
        })
    }


    const userRole = req.user.role;

    if(!allowedRoles.includes(userRole)){
        return res.status(403).json({
            success:false,
            message:"Access denied. Insufficient permissions."
        })
    }

    return next();
}