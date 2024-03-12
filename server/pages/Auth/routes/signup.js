import { Router } from "express";
import signupFaculty from "../controllers/signupFaculty.js";
import signupStudent from "../controllers/signupStudent.js";
import checkUser from "../middlewares/checkUser.js";
import loginHandler from "../controllers/loginHandler.js";

const router = Router();

router.use(checkUser);
router.post("/student", signupStudent);
router.post("/faculty", signupFaculty);
router.use(loginHandler);

export default router;
