import express from "express";
import fileUpload from "express-fileupload";

import {
  createAudioSubCategory,
  fetchAllAudioSubCategories,
  fetchSingleAudioSubCategory,
  updateAudioSubCategory,
  deleteAudioSubCategory,
} from "../controllers/audioSubCategory.js";

const router = express.Router();
//setup for file upload
router.use(
  fileUpload({
    createParentPath: true,
    limits: { fileSize: 2 * 1024 * 1024 },
  })
);

router.post("/", createAudioSubCategory);
router.get("/fetch", fetchAllAudioSubCategories);
router.get("/fetch/:id", fetchSingleAudioSubCategory);
router.patch("/update/:id", updateAudioSubCategory);
router.delete("/delete/:id", deleteAudioSubCategory);

export default router;
