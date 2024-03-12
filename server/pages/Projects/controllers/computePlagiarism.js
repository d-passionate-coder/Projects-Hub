import Project from "../models/Projects.js";

const computePlagiarism = (req, res) => {
  const projectId = req.body.id;
  Project.findById(projectId)
    .then((project) => {
      if (project) {
        project.plagiarism.score = 40;
        project.save().then((finalProj) => {
          setTimeout(() => res.status(201).send(finalProj.plagiarism), 8000);
        });
      } else {
        throw new Error("Project not found");
      }
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
};

export default computePlagiarism;
