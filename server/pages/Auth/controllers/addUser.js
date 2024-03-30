import { Faculty, Student } from "../models/validate.js";

export const addNewStudent = async (req, res) => {
  try {
    const { email, studentId } = req.body;
    await Student.create({ email, studentId });
    return res.status(201).send("Done");
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const addNewFaculty = async (req, res) => {
  try {
    const { email } = req.body;
    await Faculty.create({ email });
    return res.status(201).send("Done");
  } catch (error) {
    return res.status(500).send(error);
  }
};
