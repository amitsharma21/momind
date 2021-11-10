import express from "express";

import {
  createMomindMinute,
  fetchAllMomindMinute,
  fetchSingleMomindMinute,
  deleteMomindMinute,
} from "../controllers/momindMinute.js";

const router = express.Router();

router.get("/fetch", fetchAllMomindMinute);
router.get("/fetch/:id", fetchSingleMomindMinute);
router.post("/", createMomindMinute);
router.delete("/delete/:id", deleteMomindMinute);

export default router;
