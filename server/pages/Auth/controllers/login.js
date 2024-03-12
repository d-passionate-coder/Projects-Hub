import passport from "passport";

export default function logIn(req, res, next) {
  passport.authenticate("local", function (err, user) {
    if (err) {
      return res.status(500).send("Error");
    }
    if (!user) {
      return res.status(401).send("Unauthorized user");
    }
    req.login(user, function (err) {
      if (err) {
        return res.status(500).send("err");
      }
      res.status(201).send(user);
    });
  })(req, res, next);
}
