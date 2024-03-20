import User from "../../Auth/models/Users.js";
import Project from "../models/Projects.js";

const setManual = (req, res) => {
  Project.updateOne(
    { title: "Hello world" },
    {
      status: "Approved",
    }
  )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  // Project.updateMany({}, { $set: { plagiarism: null } })
  //   .then(() => console.log("done"))
  //   .catch((err) => console.log(err));
};

export default setManual;
