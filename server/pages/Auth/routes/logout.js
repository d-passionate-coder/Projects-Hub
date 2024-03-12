import { Router } from "express";
import logOut from "../controllers/logout.js";

const router = Router();

router.get("/", logOut);

export default router;
