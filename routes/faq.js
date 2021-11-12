import express from "express";

import {
  fetchAllFaq,
  fetchSingleFaq,
  createFaq,
  deleteFaq,
} from "../controllers/faq.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     FAQ:
 *       type: object
 *       required:
 *         - question
 *         - answer
 *       properties:
 *         question:
 *           type: string
 *           description: The FAQ Question
 *         answer:
 *           type: string
 *           description: The FAQ Answer
 *       example:
 *         title: question 1
 *         author: answer1
 */
/**
 * @swagger
 * tags:
 *   name: FAQ
 *   description: The FAQ managing API
 */
/**
 * @swagger
 * /faq/fetch:
 *   get:
 *     summary: Returns the list of all the FAQ
 *     tags: [FAQ]
 *     responses:
 *       200:
 *         description: The list of the FAQ
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FAQ'
 *       500:
 *         description: something went wrong
 */
router.get("/fetch", fetchAllFaq);

/**
 * @swagger
 * /faq/fetch/{id}:
 *   get:
 *     summary: Get the faq by id
 *     tags: [FAQ]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The faq id
 *     responses:
 *       200:
 *         description: The faq description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FAQ'
 *       500:
 *         description: The faq was not found
 */
router.get("/fetch/:id", fetchSingleFaq);

/**
 * @swagger
 * /faq:
 *   post:
 *     summary: Create a new FAQ
 *     tags: [FAQ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FAQ'
 *     responses:
 *       200:
 *         description: The FAQ was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FAQ'
 *       500:
 *         description: Some server error
 */
router.post("/", createFaq);

/**
 * @swagger
 * /faq/delete/{id}:
 *   delete:
 *     summary: Remove the faq by id
 *     tags: [FAQ]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The faq id
 *
 *     responses:
 *       200:
 *         description: The faq was deleted
 *       500:
 *         description: Something went wrong
 */
router.delete("/delete/:id", deleteFaq);

export default router;
