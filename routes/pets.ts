import { Router } from "express";
import {
  petsDelete,
  petsGet,
  petByIdGet,
  petsPost,
  petsPut,
} from "../controllers/pets";
import {
  petCreationValidators,
  petGetValidators,
  petUpdateValidators,
} from "../middlewares/petValidators";

const router = Router();

router.get("/", petsGet);
router.get("/:id", petGetValidators, petByIdGet);
router.post("/", petCreationValidators, petsPost);
router.put("/:id", petUpdateValidators, petsPut);
router.delete("/:id", petUpdateValidators, petsDelete);

export default router;
