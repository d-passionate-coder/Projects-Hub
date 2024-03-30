import mongoose, { mongo } from "mongoose";

const { Schema } = mongoose;

const projectSchema = new mongoose.Schema(
  {
    title: String,
    category: String,
    guide: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    proposal: {
      content: Buffer,
      statement: String,
      status: {
        type: String,
        enum: ["Approved", "Pending", "Rejected"],
        default: "Pending",
      },
    },
    status: {
      type: String,
      enum: ["Approved", "Pending", "Rejected"],
      default: "Pending",
    },
    content: Buffer,
    plagiarism: {
      report: Array,
    },
    approved: {
      type: Boolean,
      default: true,
    },
    institute: String,
    createdBy: { type: Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

const Project = mongoose.model("project", projectSchema);

export default Project;
