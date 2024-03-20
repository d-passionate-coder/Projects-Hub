import Project from "../models/Projects.js";

const getProjectsByCount = (req, res) => {
  const count = Number(req.params.count);
  Project.find({ approved: true })
    .limit(count)
    .populate("createdBy")
    .then((projects) => {
      if (projects) {
        const ProjectDetails =
          projects?.length > 0
            ? projects.reduce(
                (
                  filtered,
                  { title, id, proposal, category, createdBy, status, content }
                ) => {
                  content &&
                    status === "Approved" &&
                    filtered.push({
                      title,
                      id,
                      statement: proposal.statement,
                      category,
                      createdBy,
                    });
                  return filtered;
                },
                []
              )
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
