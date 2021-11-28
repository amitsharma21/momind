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

/**
 * @swagger
 * components:
 *   schemas:
 *     Audio:
 *       type: object
 *       required:
 *         - name
 *         - audio
 *         - thumbnail
 *         - isPremium
 *         - subCategory
 *       properties:
 *         name:
 *           type: string
 *           description: Enter the name of music
 *         audio:
 *           type: string
 *           description: Enter the Music file
 *         thumbnail:
 *           type: string
 *           description: Enter the Thumbnail file
 *         isPremium:
 *           type: string
 *           description: Is premium of not
 *         subCategory:
 *           type: string
 *           description: Enter the Subcategory Id
 */
/**
 * @swagger
 * tags:
 *   name: Audio
 *   description: The Audio managing API
 */

/**
 * @swagger
 * /audio:
 *   post:
 *     summary: Create a new Audio
 *     tags: [Audio]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Audio'
 *     responses:
 *       200:
 *         description: The Audio was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Audio'
 *       500:
 *         description: Some server error
 */
router.post("/", createAudio);
router.get("/stream/:id", streamAudio);

/**
 * @swagger
 * /audio/fetch:
 *   get:
 *     summary: Returns the list of all the Songs
 *     tags: [Audio]
 *     responses:
 *       200:
 *         description: The list of the Audio
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Audio'
 *       500:
 *         description: something went wrong
 */

router.get("/fetch", fetchAllAudio);

/**
 * @swagger
 * /audio/fetch/{id}:
 *   get:
 *     summary: Get the audio by id
 *     tags: [Audio]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The audio id
 *     responses:
 *       200:
 *         description: The Audio description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Audio'
 *       500:
 *         description: The Audio was not found
 */
router.get("/fetch/:id", fetchSingleAudio);

/**
 * @swagger
 * /audio/delete/{id}:
 *   delete:
 *     summary: Remove the audio by id
 *     tags: [Audio]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The audio id
 *
 *     responses:
 *       200:
 *         description: The audio was deleted
 *       500:
 *         description: Something went wrong
 */
router.delete("/delete/:id", deleteAudio);
// router.patch("/addtofavourite", userAuth, addToFavourite);
// router.get("/fetchfavourite", userAuth, fetchFavourites);
// router.patch("/removefromfavourite", userAuth, removeFromFavourite);

export default router;
