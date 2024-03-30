import passport from "passport";
import LocalStrategy from "passport-local";
import User from "../models/Users.js";
import { verifyPassword } from "../utils/passUtils.js";

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id)
    .then((user) => {
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    })
    .catch((err) => {
      return done(err);
    });
});

const customFields = {
  usernameField: "email",
  passwordField: "password",
};

const verifyCallback = function (email, password, done) {
  User.findOne({ email })
    .then((user) => {
      if (!user) return done("Email not found", false);
      const isValid = verifyPassword(password, user.hash, user.salt);
      if (isValid) return done(null, user);
      else return done("Incorrect password", false);
    })
    .catch((err) => done(err));
};

const strategy = new LocalStrategy(customFields, verifyCallback);
passport.use(strategy);
