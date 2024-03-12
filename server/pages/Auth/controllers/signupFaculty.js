import { genPassword } from "../utils/passUtils.js";
import User from "../models/Users.js";
import { Faculty } from "../models/validate.js";

const signupFaculty = (req, res, next) => {
  const { isStudent, firstName, lastName, institute, email, password } =
    req.body;

  Faculty.findOne({ email })
    .then((user) => {
      if (!user) return res.status(400).end("Faculty not found");
      const { salt, hash } = genPassword(password);

      const newUser = {
        isStudent,
        firstName,
        lastName,
        institute,
        email,
        hash: hash,
        salt: salt,
      };

      User.create(newUser)
        .then((faculty) => {
          next();
        })
        .catch((err) => res.status(500).end(err.message));
    })
    .catch((err) => res.status(500).end({ err: err.message }));
};

export default signupFaculty;
