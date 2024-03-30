import Project from "../models/Projects.js";

const getProjectsByCount = (req, res) => {
  const count = Number(req.params.count);
  Project.find({ status: "Approved" })
    .limit(count)
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

export default getProjectsByCount;
