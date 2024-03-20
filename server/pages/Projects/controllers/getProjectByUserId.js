import User from "../../Auth/models/Users.js";

const getProjectByUserId = (req, res) => {
  User.findById(req.user.id)
    .populate({
      path: "projects",
      populate: { path: "guide", select: "firstName lastName" },
    })
    .then((user) => {
      if (user) {
        const projDetails =
          user.projects?.length <= 0
            ? []
            : user.projects.map(
                ({
                  id,
                  title,
                  proposal,
                  createdAt,
                  guide,
                  content,
                  status,
                }) => {
                  return {
                    id,
                    title,
                    proposalStatus: proposal.status,
                    projectStatus: status,
                    createdAt,
                    guide,
                    projectSubmitted: content ? true : false,
                  };
                }
              );
        return res.send(projDetails);
      } else {
        throw new Error("User not found");
      }
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
};

export default getProjectByUserId;
