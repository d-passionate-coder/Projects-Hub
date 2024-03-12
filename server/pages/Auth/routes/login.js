import { Router } from "express";
import logIn from "../controllers/login.js";

const router = Router();

router.post("/", logIn, (req, res) => {
  console.log(req.session);
});

export default router;
