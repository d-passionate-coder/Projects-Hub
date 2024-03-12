import User from "../models/Users.js";

const getGuideByInstitute = (req, res) => {
  User.find({ isStudent: false, institute: req.user?.institute })
    .then((guides) => {
      const AllGuides = guides.map((guide) => {
        return { id: guide.id, name: guide.firstName + " " + guide.lastName };
      });
      return res.status(201).send(AllGuides);
    })
    .catch((error) => {
      return res.status(500).send(error);
    });
};

export default getGuideByInstitute;
