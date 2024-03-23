import Project from "../models/Projects.js";

const changeProjectStatus = async (req, res) => {
  const { id, status: newStatus } = req.body;
  try {
    const project = await Project.findById(id);
    if (project) {
      project.status = newStatus;
      await project.save();
      return res.send("done");
    } else {
      throw new Error("No project found");
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

export default changeProjectStatus;
