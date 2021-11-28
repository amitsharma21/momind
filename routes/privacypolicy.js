import express from "express";

import {
  fetchPrivacyPolicy,
  createPrivacyPolicy,
  updatePrivacyPolicy,
} from "../controllers/privacypolicy.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     PrivacyPolicy:
 *       type: object
 *       required:
 *         - privacyPolicy
 *       properties:
 *         privacyPolicy:
 *           type: string
 *           description: Enter the Privacy Policy
 *       example:
 *         privacyPolicy: Our Privacy Policy
 */
/**
 * @swagger
 * tags:
 *   name: PrivacyPolicy
 *   description: The Privacy Policy managing API
 */
/**
 * @swagger
 * /privacypolicy/fetch:
 *   get:
 *     summary: Returns the Privacy Policy details
 *     tags: [PrivacyPolicy]
 *     responses:
 *       200:
 *         description: Contact us details
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PrivacyPolicy'
 *       500:
 *         description: something went wrong
 */

router.get("/fetch", fetchPrivacyPolicy);
/**
 * @swagger
 * /privacypolicy:
 *   post:
 *     summary: Create Privacy Policy
 *     tags: [PrivacyPolicy]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PrivacyPolicy'
 *     responses:
 *       200:
 *         description: The Privacy Policy was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Privacy Policy'
 *       500:
 *         description: Some server error
 */
router.post("/", createPrivacyPolicy);

/**
 * @swagger
 * /privacypolicy/update/{id}:
 *  patch:
 *    summary: Update the Privacy Policy
 *    tags: [PrivacyPolicy]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/PrivacyPolicy'
 *    responses:
 *      200:
 *        description: The Privacy policy update
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PrivacyPolicy'
 *      500:
 *        description: Some error happened
 */
router.patch("/update", updatePrivacyPolicy);

export default router;
