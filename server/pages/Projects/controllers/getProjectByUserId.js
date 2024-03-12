import User from "../../Auth/models/Users.js";

const getProjectByUserId = (req, res) => {
  User.findById(req.user.id)
    .populate({
      path: "projects",
      populate: { path: "guide", select: "firstName lastName" },
    })
    .then((user) => {
      if (user) {
        const projDetails = user.projects.map(
          ({ id, title, proposal, createdAt, guide, content, approved }) => {
            return {
              id,
              title,
              proposalApproved: proposal.approved,
              projectApproved: approved,
              createdAt,
              guide,
              projectSubmitted: content ? true : false,
            };
          }
        );
        return res.status(200).send(projDetails);
      } else {
        throw new Error("User not found");
      }
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
};

export default getProjectByUserId;
