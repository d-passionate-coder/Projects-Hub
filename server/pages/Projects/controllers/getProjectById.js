import Project from "../models/Projects.js";

const getProjectById = (req, res) => {
  const projectId = req.params.id.toString();
  Project.findById(projectId)
    .populate("guide")
    .then((project) => {
      if (project) return res.status(201).send(project);
      else {
        throw new Error("Not found");
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

export default getProjectById;
