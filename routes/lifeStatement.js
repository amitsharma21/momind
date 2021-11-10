//need authentication
import express from "express";
import userAuth from "../middleware/userAuth.js";

import {
  createLifeStatement,
  fetchLifeStatement,
} from "../controllers/lifeStatement.js";

const router = express.Router();

router.post("/", userAuth, createLifeStatement);
router.get("/fetch/:givendate", userAuth, fetchLifeStatement);

export default router;
