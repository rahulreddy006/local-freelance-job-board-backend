import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: function() {
        return this.provider === "local";
      },
      minlength: 6,
    },
    provider:{
      type:String,
      enum:["local","google"],
      default:"local"
    },
    googleId:{
      type:String,
      sparse:true
    },

    role: {
      type: String,
      enum: ["student", "business",null],
      default:null
    },
    isOnboarded:{
      type:Boolean,
      default:false
    }
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model("User", userSchema);
