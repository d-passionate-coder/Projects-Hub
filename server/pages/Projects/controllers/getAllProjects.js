import Project from "../models/Projects.js";

const getAllProjects = (req, res) => {
  Project.find({ approved: true })
    .populate("createdBy")
    .then((projects) => {
      if (projects) {
        const ProjectDetails = projects.map(
          ({ title, id, proposal, category, createdBy }) => {
            return {
              title,
              id,
              statement: proposal.statement,
              category,
              createdBy,
            };
          }
        );
        res.status(200).send(ProjectDetails);
      } else {
        throw new Error("No projects found");
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

export default getAllProjects;
