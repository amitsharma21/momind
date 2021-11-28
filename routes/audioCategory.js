import express from "express";

import {
  createAudioCategory,
  fetchAllAudioCategories,
  fetchSingleAudioCategory,
  updateAudioCategory,
  deleteAudioCategory,
} from "../controllers/audioCategory.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     AudioCategory:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 *           description: The Audio Category
 *       example:
 *         title: Music
 */
/**
 * @swagger
 * tags:
 *   name: AudioCategory
 *   description: The Audio Category managing API
 */

/**
 * @swagger
 * /audiocategory:
 *   post:
 *     summary: Create a new Audio category
 *     tags: [AudioCategory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AudioCategory'
 *     responses:
 *       200:
 *         description: The Audio Category was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AudioCategory'
 *       500:
 *         description: Some server error
 */
router.post("/", createAudioCategory);

/**
 * @swagger
 * /audiocategory/fetch:
 *   get:
 *     summary: Returns the list of all the Audio Category
 *     tags: [AudioCategory]
 *     responses:
 *       200:
 *         description: The list of the Audio Category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AudioCategory'
 *       500:
 *         description: something went wrong
 */
router.get("/fetch", fetchAllAudioCategories);

/**
 * @swagger
 * /audiocategory/fetch/{id}:
 *   get:
 *     summary: Get the audio category by id
 *     tags: [AudioCategory]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The audio category id
 *     responses:
 *       200:
 *         description: The audio category description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AudioCategory'
 *       500:
 *         description: The audio category was not found
 */
router.get("/fetch/:id", fetchSingleAudioCategory);

/**
 * @swagger
 * /audiocategory/update/{id}:
 *  patch:
 *    summary: Update the Audio Category
 *    tags: [AudioCategory]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/AudioCategory'
 *    responses:
 *      200:
 *        description: The AudioCategory update
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AudioCategory'
 *      500:
 *        description: Some error happened
 */
router.patch("/update/:id", updateAudioCategory);

/**
 * @swagger
 * /audiocategory/delete/{id}:
 *   delete:
 *     summary: Remove the audio category by id
 *     tags: [AudioCategory]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Audio Category id
 *
 *     responses:
 *       200:
 *         description: The Audio Category was deleted
 *       500:
 *         description: Something went wrong
 */
router.delete("/delete/:id", deleteAudioCategory);

export default router;
