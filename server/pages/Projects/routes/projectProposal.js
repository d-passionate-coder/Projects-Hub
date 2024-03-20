import { Router } from "express";
import multer from "multer";
import handleProposalUpload from "../controllers/proposalUpload.js";
import computePlagiarism from "../controllers/computePlagiarism.js";
import deleteProposal from "../controllers/deleteProposal.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = Router();

router.post("/upload", upload.single("pdf"), handleProposalUpload);
router.post("/compute-plagiarism", computePlagiarism);
router.delete("/:id", deleteProposal);

export default router;
