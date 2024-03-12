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
      approved: {
        type: Boolean,
        default: true,
      },
      pending: {
        type: Boolean,
        default: false,
      },
    },
    content: Buffer,
    plagiarism: {
      score: Number,
    },
    approved: {
      type: Boolean,
      default: true,
    },
    createdBy: { type: Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

const Project = mongoose.model("project", projectSchema);

export default Project;
