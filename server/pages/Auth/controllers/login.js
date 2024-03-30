import passport from "passport";

export default function logIn(req, res, next) {
  passport.authenticate("local", function (err, user) {
    if (err) {
      return res.status(500).send(err);
    }
    if (!user) {
      return res.status(401).send(err);
    }
    req.login(user, function (err) {
      if (err) {
        return res.status(500).send("Please try again after sometime");
      }
      res.status(201).send(user);
    });
  })(req, res, next);
}
