import Project from "../models/Projects.js";

const handleUpload = (req, res) => {
  const { project: id, category } = req.body;
  const projectPdf = req.file.buffer;

  Project.findById(id)
    .then((project) => {
      if (project) {
        project.category = category;
        project.content = projectPdf;

        return project.save();
      } else {
        throw new Error("project not found");
      }
    })
    .then((updatedProject) => {
      return res.status(200).send(updatedProject.id);
    })
    .catch((err) => {
      return res.status(500).send(err.message);
    });
};

export default handleUpload;
