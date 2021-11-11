import express from "express";

import {
  createPricingPlan,
  fetchPricingPlan,
  updatePricingPlan,
  addPricingPlan,
} from "../controllers/pricingPlans.js";

const router = express.Router();

router.post("/", createPricingPlan);
router.post("/add", addPricingPlan);
router.get("/fetch", fetchPricingPlan);
router.patch("/update", updatePricingPlan);

export default router;
