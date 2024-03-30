import User from "../../Auth/models/Users.js";
import { Faculty, Student } from "../../Auth/models/validate.js";
import Project from "../models/Projects.js";

const setManual = async (req, res) => {
  const res1 = await Student.deleteMany({});
  console.log(res1);
  const res2 = await Faculty.deleteMany({});
  console.log(res2);
};

export default setManual;
