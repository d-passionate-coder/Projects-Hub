import User from "../../Auth/models/Users.js";
import Project from "../models/Projects.js";

const setManual = (req, res) => {
  User.findById(req.user.id)
    .populate("projects")
    .then((user) => {
      const proj = user.projects;
      proj.forEach((element) => {
        console.log(element.id);
        Project.updateOne({ _id: element.id }, { createdBy: req.user.id })
          .then((result) => {
            console.log(result);
            res.end();
          })
          .catch((err) => console.log(err));
      });
    });
};

export default setManual;
