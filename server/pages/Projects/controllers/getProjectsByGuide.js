import Project from "../models/Projects.js";

const getProjectsByGuide = async (req, res) => {
  try {
    const projects = await Project.find({
      guide: {
        _id: req.user.id,
      },
    }).populate("createdBy");
    if (projects) {
      const finalProjects = projects.map((project) => {
        const {
          _id,
          title,
          createdBy,
          proposal,
          status,
          createdAt,
          plagiarism,
          content,
        } = project;
        let data = {
          id: _id,
          title,
          studentName: createdBy.firstName,
          studentId: createdBy.studentId,
          proposalStatus: proposal.status,
          projectStatus: status,
          plagiarism,
          projectSubmitted: content ? true : false,
          createdAt,
          problemStatement: proposal.statement,
        };
        return data;
      });
      return res.send(finalProjects);
    } else {
      throw new Error("No projects found");
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

export default getProjectsByGuide;
