import express from "express";

import { fetchContactus, createContactus } from "../controllers/contactus.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     ContactUs:
 *       type: object
 *       required:
 *         - email
 *         - phoneNumber
 *         - address
 *       properties:
 *         email:
 *           type: string
 *           description: Enter the Email
 *         phoneNumber:
 *           type: string
 *           description: Enter the Phone Number
 *         address:
 *           type: string
 *           description: Enter The Address
 *       example:
 *         email: amitsharma@ideausher.com
 *         phoneNumber: +91987654321
 *         address: Mohali Chandigaarh
 */
/**
 * @swagger
 * tags:
 *   name: ContactUs
 *   description: The Contact Us managing API
 */
/**
 * @swagger
 * /contactus/fetch:
 *   get:
 *     summary: Returns the contact us details
 *     tags: [ContactUs]
 *     responses:
 *       200:
 *         description: Contact us details
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ContactUs'
 *       500:
 *         description: something went wrong
 */
router.get("/fetch", fetchContactus);

/**
 * @swagger
 * /contactus:
 *   post:
 *     summary: Create Contact us
 *     tags: [ContactUs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactUs'
 *     responses:
 *       200:
 *         description: The Contact Us was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ContactUs'
 *       500:
 *         description: Some server error
 */
router.post("/", createContactus);

export default router;
