import mongoose from "mongoose";
import User from "../../Auth/models/Users.js";
import Project from "../models/Projects.js";

const handleProposalUpload = (req, res) => {
  const { title, guide } = req.body;
  const guide_id = new mongoose.Types.ObjectId(guide);
  const proposalContent = {
    statement: req.body.problemStatement,
    content: req.file.buffer,
  };

  Project.create({
    title,
    guide: guide_id,
    proposal: proposalContent,
    createdBy: req.user.id,
    institute: req.user.institute,
  })
    .then((project) => {
      User.findById(req.user.id)
        .then((user) => {
          if (user) {
            user.projects.push(project.id);
            return user.save();
          } else {
            throw new Error("user not found");
          }
        })
        .then(() => {
          return res.status(201).send(project.id);
        })
        .catch((err) => {
          return res.status(500).send(err.message);
        });
    })
    .catch((err) => {
      return res.status(500).send(err.message);
    });
};

export default handleProposalUpload;
