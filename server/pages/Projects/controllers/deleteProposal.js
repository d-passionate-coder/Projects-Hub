import User from "../../Auth/models/Users.js";
import Project from "../models/Projects.js";

const deleteProposal = async (req, res) => {
  try {
    await User.updateOne(
      { _id: req.user._id },
      {
        $pull: {
          projects: req.params.id,
        },
      }
    );
    await Project.deleteOne({ _id: req.params.id });
    return res.send("Succesfully removed");
  } catch (error) {
    return res.status(500).send(error);
  }
};

export default deleteProposal;
