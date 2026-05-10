import mongoose from "mongoose";
import { User } from "./user.model.js";

const Schema = mongoose.Schema;

const gigSchema = new Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true
    },
    skillsRequired:{
        type:[ String ],
        required:true
    },
    deadline:{
        type:Date
    },
    status:{
        type:String,
        enum:["open","in-progress","completed"],
        default:"open"
    },
    ownerId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{
    timestamps:true
}) 

export const Gig = mongoose.model("Gig",gigSchema);