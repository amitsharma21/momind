import express from "express";
import fileUpload from "express-fileupload";

import {
  createAudioSubCategory,
  fetchAllAudioSubCategories,
  fetchSingleAudioSubCategory,
  updateAudioSubCategory,
  deleteAudioSubCategory,
} from "../controllers/audioSubCategory.js";

const router = express.Router();
//setup for file upload
router.use(
  fileUpload({
    createParentPath: true,
    limits: { fileSize: 2 * 1024 * 1024 },
  })
);

/**
 * @swagger
 * components:
 *   schemas:
 *     AudioSubCategory:
 *       type: object
 *       required:
 *         - title
 *         - thumbnail
 *         - categoryId
 *       properties:
 *         title:
 *           type: string
 *           description: The Audio Category
 *         thumbnail:
 *           type: string
 *           description: The Audio Category
 *         categoryId:
 *           type: string
 *           description: The Audio Category
 *       example:
 *         title: Music
 *         thumbnail: photo come here
 *         categoryId: Hash provided by mongo
 */
/**
 * @swagger
 * tags:
 *   name: AudioSubCategory
 *   description: The Audio SubCategory managing API
 */

/**
 * @swagger
 * /audiosubcategory:
 *   post:
 *     summary: Create a new Audio sub category
 *     tags: [AudioSubCategory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AudioSubCategory'
 *     responses:
 *       200:
 *         description: The Audio Sub Category was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AudioSubCategory'
 *       500:
 *         description: Some server error
 */
router.post("/", createAudioSubCategory);

/**
 * @swagger
 * /audiosubcategory/fetch:
 *   get:
 *     summary: Returns the list of all the Audio sub Category
 *     tags: [AudioSubCategory]
 *     responses:
 *       200:
 *         description: The list of the Audio sub Category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AudioSubCategory'
 *       500:
 *         description: something went wrong
 */
router.get("/fetch", fetchAllAudioSubCategories);

/**
 * @swagger
 * /audiosubcategory/fetch/{id}:
 *   get:
 *     summary: Get the audio sub category by id
 *     tags: [AudioSubCategory]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The audio category id
 *     responses:
 *       200:
 *         description: The audio sub category description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AudioSubCategory'
 *       500:
 *         description: The audio sub category was not found
 */
router.get("/fetch/:id", fetchSingleAudioSubCategory);

/**
 * @swagger
 * /audiosubcategory/update/{id}:
 *  patch:
 *    summary: Update the Audio sub Category
 *    tags: [AudioSubCategory]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/AudioSubCategory'
 *    responses:
 *      200:
 *        description: The AudioSubCategory update
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AudioSubCategory'
 *      500:
 *        description: Some error happened
 */
router.patch("/update/:id", updateAudioSubCategory);

/**
 * @swagger
 * /audiosubcategory/delete/{id}:
 *   delete:
 *     summary: Remove the audio sub category by id
 *     tags: [AudioSubCategory]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Audio sub Category id
 *
 *     responses:
 *       200:
 *         description: The Audio Sub Category was deleted
 *       500:
 *         description: Something went wrong
 */
router.delete("/delete/:id", deleteAudioSubCategory);

export default router;
