import User from "../models/Users.js";

const loginHandler = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) return res.status(400).send("Authentication error");
      req.login(user, function (err) {
        if (err) {
          return res.status(500).send(err);
        }
        res.status(201).send(req.user);
      });
    })
    .catch((err) => res.status(500).send(err));
};

export default loginHandler;
