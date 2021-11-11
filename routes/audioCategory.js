import express from "express";

import {
  createAudioCategory,
  fetchAllAudioCategories,
  fetchSingleAudioCategory,
  updateAudioCategory,
  deleteAudioCategory,
} from "../controllers/audioCategory.js";

const router = express.Router();

router.post("/", createAudioCategory);
router.get("/fetch", fetchAllAudioCategories);
router.get("/fetch/:id", fetchSingleAudioCategory);
router.patch("/update/:id", updateAudioCategory);
router.delete("/delete/:id", deleteAudioCategory);

export default router;
