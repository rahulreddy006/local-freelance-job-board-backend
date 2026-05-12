import mongoose from "mongoose";

const Schema = mongoose.Schema;

const applicationSchema = new Schema(
  {
    gigId: {
      type: Schema.Types.ObjectId,
      ref: "Gig",
      required: true,
    },
    appliedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

applicationSchema.index(
  {
    gigId: 1,
    appliedBy: 1,
  },
  { unique: true },
);

export const Application = mongoose.model("Application", applicationSchema);
