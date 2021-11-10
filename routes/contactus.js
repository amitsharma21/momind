import express from "express";

import { fetchContactus, createContactus } from "../controllers/contactus.js";

const router = express.Router();

router.get("/fetch", fetchContactus);
router.post("/", createContactus);

export default router;
