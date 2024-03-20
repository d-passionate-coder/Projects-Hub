import { connect } from "mongoose";
import Project from "../models/Projects.js";

const getAllProjects = (req, res) => {
  Project.find({ approved: true })
    .populate("createdBy")
    .then((projects) => {
      if (projects) {
        const ProjectDetails =
          projects?.length > 0
            ? projects.reduce(
                (
                  filtered,
                  { title, id, proposal, category, createdBy, content, status }
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

export default getAllProjects;
