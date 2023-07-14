import { Router } from "express";
import { petsGet, petsPost } from "../controllers/pets";

const router = Router();

router.get("/", petsGet);
router.post("/", petsPost);

export default router;
