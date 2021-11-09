import express from "express";

import {
  fetchAllFaq,
  fetchSingleFaq,
  createFaq,
  deleteFaq,
} from "../controllers/faq.js";

const router = express.Router();

router.get("/fetch", fetchAllFaq);
router.get("/fetch/:id", fetchSingleFaq);
router.post("/", createFaq);
router.delete("/delete/:id", deleteFaq);

export default router;
