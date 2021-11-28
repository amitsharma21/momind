import express from "express";
import fileUpload from "express-fileupload";

import {
  createBlog,
  fetchSingleBlog,
  fetchAllBlogs,
  updateBlog,
  deleteBlog,
  toggleBlog,
} from "../controllers/blog.js";

const router = express.Router();

//setup for file upload
router.use(
  fileUpload({
    createParentPath: true,
    limits: { fileSize: 2 * 1024 * 1024 },
    useTempFiles: true,
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
 *         - description
 *         - tags
 *         - image
 *         - body
 *         - active
 *       properties:
 *         title:
 *           type: string
 *           description: The blog title
 *         description:
 *           type: string
 *           description: The blog description
 *         tags:
 *           type: string
 *           description: The comma seperated tags in form of string
 *         image:
 *           type: file
 *           description: file upload option
 *         body:
 *           type: object
 *           description: The body object coming from rich text editor
 *         active:
 *           type: boolean
 *           description: is blog active or not
 *       example:
 *         title: Music
 *         thumbnail: photo come here
 *         categoryId: Hash provided by mongo
 */
/**
 * @swagger
 * tags:
 *   name: Blog
 *   description: The Blog managing API
 */

/**
 * @swagger
 * /blog:
 *   post:
 *     summary: Create a new Blog
 *     tags: [Blog]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       200:
 *         description: The Blog  was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       500:
 *         description: Some server error
 */
router.post("/", createBlog);

/**
 * @swagger
 * /blog/fetch:
 *   get:
 *     summary: Returns the list of all the blogs
 *     tags: [Blog]
 *     responses:
 *       200:
 *         description: The list of the Blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 *       500:
 *         description: something went wrong
 */
router.get("/fetch", fetchAllBlogs);

/**
 * @swagger
 * /blog/fetch/{id}:
 *   get:
 *     summary: Get the blog by id
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog id
 *     responses:
 *       200:
 *         description: The blog description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       500:
 *         description: The Blog was not found
 */
router.get("/fetch/:id", fetchSingleBlog);

/**
 * @swagger
 * /blog/update/{id}:
 *  patch:
 *    summary: Update the Blog
 *    tags: [Blog]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Blog'
 *    responses:
 *      200:
 *        description: The Blog update
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Blog'
 *      500:
 *        description: Some error happened
 */
router.patch("/update/:id", updateBlog);

/**
 * @swagger
 * /blog/delete/{id}:
 *   delete:
 *     summary: Remove the audio sub category by id
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Blog id
 *
 *     responses:
 *       200:
 *         description: The Blog was deleted
 *       500:
 *         description: Something went wrong
 */
router.delete("/delete/:id", deleteBlog);

/**
 * @swagger
 * /blog/toggle/{id}:
 *  patch:
 *    summary: Update the Blog
 *    tags: [Blog]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Blog'
 *    responses:
 *      200:
 *        description: The Blog Toggle
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Blog'
 *      500:
 *        description: Some error happened
 */
router.patch("/toggle/:id", toggleBlog);

export default router;
