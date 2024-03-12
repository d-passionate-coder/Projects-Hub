import { genPassword } from "../utils/passUtils.js";
import User from "../models/Users.js";
import { Student } from "../models/validate.js";

const signupStudent = (req, res, next) => {
  const {
    isStudent,
    studentId,
    firstName,
    lastName,
    institute,
    email,
    password,
  } = req.body;

  Student.findOne({ studentId, email })
    .then((user) => {
      if (!user) return res.status(400).end("Student not found");
      const { salt, hash } = genPassword(password);

      const newUser = {
        isStudent,
        firstName,
        lastName,
        institute,
        studentId,
        email,
        hash: hash,
        salt: salt,
      };

      User.create(newUser)
        .then((student) => next())
        .catch((err) => res.status(500).end(err.message));
    })
    .catch((err) => res.status(500).end(err.message));
};

export default signupStudent;
