import express from "express";

import {
  createSubCategory,
  fetchAllSubCategories,
  fetchSingleSubCategory,
  updateSubCategory,
  deleteSubCategory,
} from "../controllers/subCategory.js";

const router = express.Router();

router.post("/", createSubCategory);
router.get("/fetch", fetchAllSubCategories);
router.get("/fetch/:id", fetchSingleSubCategory);
router.patch("/update/:id", updateSubCategory);
router.delete("/delete/:id", deleteSubCategory);

export default router;
