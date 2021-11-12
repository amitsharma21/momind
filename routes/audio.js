import express from "express";
import fileUpload from "express-fileupload";

import {
  createAudio,
  streamAudio,
  fetchAllAudio,
  fetchSingleAudio,
  deleteAudio,
} from "../controllers/audio.js";
import userAuth from "../middleware/userAuth.js";

const router = express.Router();

router.use(
  fileUpload({
    createParentPath: true,
    limits: { fileSize: 10 * 1024 * 1024 },
  })
);

router.post("/", createAudio);
router.get("/stream/:id", streamAudio);
router.get("/fetch", fetchAllAudio);
router.get("/fetch/:id", fetchSingleAudio);
router.delete("/delete/:id", deleteAudio);
// router.patch("/addtofavourite", userAuth, addToFavourite);
// router.get("/fetchfavourite", userAuth, fetchFavourites);
// router.patch("/removefromfavourite", userAuth, removeFromFavourite);

export default router;
