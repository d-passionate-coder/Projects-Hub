import mongoose, { mongo } from "mongoose";

const studentSchema = new mongoose.Schema({
  studentId: String,
  email: String,
});

const facultySchema = new mongoose.Schema({
  email: String,
});

const Student = mongoose.model("student", studentSchema);
const Faculty = mongoose.model("faculty", facultySchema);

export { Student, Faculty };
