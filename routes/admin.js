import express from "express";

import {
  signin,
  signup,
  toggleUserStatus,
  sendEmail,
} from "../controllers/admin.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Admin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: email
 *           description: Enter the Email
 *         password:
 *           type: password
 *           description: Enter the password
 *       example:
 *         email: admin@ideausher.com
 *         password: Admin1234
 */
/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: The Admin managing API
 */

/**
 * @swagger
 * /admin/signin:
 *   post:
 *     summary: Signin API
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Admin'
 *     responses:
 *       200:
 *         description: Signin Successfull
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       500:
 *         description: Some server error
 */
router.post("/signin", signin);
router.post("/signup", signup);

router.post("/toggleuserstatus", toggleUserStatus, sendEmail);
router.post("/reactivateuser", toggleUserStatus, sendEmail);

export default router;
