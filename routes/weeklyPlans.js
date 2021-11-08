//need authentication
import express from "express";
import userAuth from "../middleware/userAuth.js";

import { createPlan, fetchPlan } from "../controllers/weeklyPlans.js";

const router = express.Router();

router.post("/create", userAuth, createPlan);
router.get("/fetch/:givendate", userAuth, fetchPlan);

export default router;
