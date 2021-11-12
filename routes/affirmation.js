//need authentication
import express from "express";
import userAuth from "../middleware/userAuth.js";

import {
  createAffirmation,
  fetchAffirmation,
} from "../controllers/affirmation.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Affirmation:
 *       type: object
 *       required:
 *         - author
 *         - date
 *         - affirmation
 *       properties:
 *         author:
 *           type: string
 *           description: Author Id
 *         date:
 *           type: String
 *           description: Enter Date
 *         affirmation:
 *           type: String
 *           description: Enter Affirmation
 *       example:
 *         author: mongo format id
 *         date: js format date
 *         affirmation: This is my affirmation
 */
/**
 * @swagger
 * tags:
 *   name: Affirmation
 *   description: The Affirmation managing API
 */

/**
 * @swagger
 * /affirmation:
 *   post:
 *     summary: Affirmation Create
 *     tags: [Affirmation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Affirmation'
 *     responses:
 *       200:
 *         description: Created Successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Affirmation'
 *       500:
 *         description: Some server error
 */

router.post("/", userAuth, createAffirmation);

/**
 * @swagger
 * /affirmation/fetch/{givendate}:
 *   get:
 *     summary: Get the Affirmation for given date
 *     tags: [Affirmation]
 *     parameters:
 *       - in: path
 *         name: givendate
 *         schema:
 *           type: string
 *         required: true
 *         description: The affirmation date
 *     responses:
 *       200:
 *         description: fetched successfull
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Affirmation'
 *       500:
 *         description: Not found
 */
router.get("/fetch/:givendate", userAuth, fetchAffirmation);

export default router;
