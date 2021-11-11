import express from "express";

import {
  createMomindMinute,
  fetchAllMomindMinute,
  fetchSingleMomindMinute,
  deleteMomindMinute,
  updateMomindMinute,
} from "../controllers/momindMinute.js";

const router = express.Router();

router.get("/fetch", fetchAllMomindMinute);
router.get("/fetch/:sequencenumber", fetchSingleMomindMinute);
router.post("/", createMomindMinute);
router.patch("/update/:id", updateMomindMinute);
router.delete("/delete/:id", deleteMomindMinute);

export default router;
