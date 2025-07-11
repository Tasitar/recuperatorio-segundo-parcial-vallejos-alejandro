import { Router } from "express";
import {
getAll,
getById,
createLanguage,
updateLanguage,
deleteLanguage
} from "../controllers/languageController.js";

const router = Router();


router.get("/", getAll);
router.get("/:id", getById);
router.post("/", createLanguage); 
router.put("/:id", updateLanguage);
router.delete("/:id", deleteLanguage);

export default router;
