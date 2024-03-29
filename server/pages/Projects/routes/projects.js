import { Router } from "express";
import multer from "multer";
import handleUpload from "../controllers/projectUpload.js";
import getProjectById from "../controllers/getProjectById.js";
import getProjectByUserId from "../controllers/getProjectByUserId.js";
import getProjectsByCount from "../controllers/getProjectsByCount.js";
import getAllProjects from "../controllers/getAllProjects.js";
import checkAuth from "../../Auth/middlewares/checkAuth.js";
import setManual from "../controllers/setManual.js";
import deleteProject from "../controllers/deleteProject.js";
import getProjectsByGuide from "../controllers/getProjectsByGuide.js";
import changeProjectStatus from "../controllers/changeProjectStatus.js";

// multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = Router();

// router.get("/", getAllProjects);
// router.get("/software", getProjectsbyCategory);
// router.get("/hardware", getProjectsbyCategory);

router.get("/manual", setManual);
router.get("/all", getAllProjects);
router.get("/limit/:count", getProjectsByCount);
router.post("/upload", checkAuth, upload.single("pdf"), handleUpload);
router.get("/user", checkAuth, getProjectByUserId);
router.get("/guide", getProjectsByGuide);
router.post("/changeStatus", changeProjectStatus);
router.get("/:id", checkAuth, getProjectById);
router.delete("/:id", checkAuth, deleteProject);

export default router;
