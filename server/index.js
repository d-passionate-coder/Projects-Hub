import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import signupRoute from "./pages/Auth/routes/signup.js";
import logInroute from "./pages/Auth/routes/login.js";
import checkLogin from "./pages/Auth/middlewares/checkLogin.js";
import logoutRoute from "./pages/Auth/routes/logout.js";
import passport from "passport";
import session from "express-session";
import projectRoute from "./pages/Projects/routes/projects.js";
import projectProposalRoute from "./pages/Projects/routes/projectProposal.js";
import "./pages/Auth/config/passport.js";
import getGuideByInstitute from "./pages/Auth/controllers/getGuideByInstitute.js";
import corsOptions from "./config/corsOptions.js";

const app = express();
const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Succesfully connected");
  })
  .catch((err) => console.log(err));

app.use(cors(corsOptions));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use("/logout", logoutRoute);
app.use("/signup", signupRoute);
app.use("/login", logInroute);
app.get("/checkLogin", checkLogin);
app.get("/guideByInstitute", getGuideByInstitute);
app.use("/project", projectRoute);
app.use("/proposal", projectProposalRoute);

app.listen(PORT, () => console.log("server started!"));
