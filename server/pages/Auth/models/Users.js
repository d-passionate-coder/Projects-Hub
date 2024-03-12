import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  isStudent: {
    type: Boolean,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  institute: {
    type: String,
    required: true,
  },
  studentId: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  projects: [{ type: Schema.Types.ObjectId, ref: "project" }],
});

const User = mongoose.model("user", userSchema);
export default User;
