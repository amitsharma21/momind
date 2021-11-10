//need authentication
import express from "express";
import userAuth from "../middleware/userAuth.js";

import {
  createAffirmation,
  fetchAffirmation,
} from "../controllers/affirmation.js";

const router = express.Router();

router.post("/", userAuth, createAffirmation);
router.get("/fetch/:givendate", userAuth, fetchAffirmation);

export default router;
