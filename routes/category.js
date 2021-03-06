import express from "express";

import {
  createCategory,
  fetchAllCategories,
  fetchSingleCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.js";

const router = express.Router();

router.post("/", createCategory);
router.get("/fetch", fetchAllCategories);
router.get("/fetch/:id", fetchSingleCategory);
router.patch("/update/:id", updateCategory);
router.delete("/delete/:id", deleteCategory);

export default router;
