import Project from "../models/Projects.js";

const getAllProjects = (req, res) => {
  const { title, category, institute } = req.query;

  const queryObject = { status: "Approved" };

  if (title) {
    queryObject.title = { $regex: title, $options: "i" };
  }

  if (category) {
    queryObject.category = { $regex: category, $options: "i" };
  }

  if (institute) {
    queryObject.institute = { $regex: institute, $options: "i" };
  }

  Project.find(queryObject)
    .then((projects) => {
      if (projects) {
        const ProjectDetails =
          projects?.length > 0
            ? projects.map(({ title, id, proposal, category, institute }) => {
                return {
                  title,
                  id,
                  statement: proposal.statement,
                  category,
                  institute,
                };
              })
            : [];
        res.send(ProjectDetails);
      } else {
        throw new Error("No projects found");
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

export default getAllProjects;
