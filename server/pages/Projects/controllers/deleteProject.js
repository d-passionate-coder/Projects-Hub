import Project from "../models/Projects.js";

const deleteProject = async (req, res) => {
  try {
    await Project.updateOne(
      { _id: req.params.id },
      {
        content: null,
        status: "Pending",
        category: null,
      }
    );

    return res.send("Successfully removed");
  } catch (error) {
    return res.status(500).send(error);
  }
};

export default deleteProject;
