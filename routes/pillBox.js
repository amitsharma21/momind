//need authentication
import express from "express";
import userAuth from "../middleware/userAuth.js";

import {
  createPillBox,
  fetchAllPillBox,
  fetchSinglePillBox,
  deletePillBox,
} from "../controllers/pillBox.js";

const router = express.Router();

router.post("/", userAuth, createPillBox);
router.get("/fetch", userAuth, fetchAllPillBox);
router.get("/fetch/:id", userAuth, fetchSinglePillBox);
router.delete("/delete/:id", userAuth, deletePillBox);

export default router;
