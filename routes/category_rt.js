
const { Router } = require("express");
const {
  getAllCategories,
  getOneCategory,
  addCategory,
  updateCategory,
  deleteCategory
} = require("../controllers/categories");
const { checkAdminToken, tokenChecker } = require("../middleware/checkToken");
const {singleFile} = require("../utils/multer")

const router = Router();


/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category management endpoints
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of categories
 */

/**
 * @swagger
 * /categories/{brand}:
 *   get:
 *     summary: Get cars by category brand
 *     tags: [Categories]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: brand
 *         required: true
 *         schema:
 *           type: string
 *         description: The brand name
 *     responses:
 *       200:
 *         description: A list of cars
 *       404:
 *         description: Brand not found
 */

/**
 * @swagger
 * /add_category:
 *   post:
 *     summary: Add a new category
 *     tags: [Categories]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [brand]
 *             properties:
 *               brand:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Category added successfully
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /update_category/{categoryId}:
 *   put:
 *     summary: Update an existing category
 *     tags: [Categories]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [brand]
 *             properties:
 *               brand:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       404:
 *         description: Category not found
 */

/**
 * @swagger
 * /delete_category/{categoryId}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Categories]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 */


router.get("/categories", tokenChecker, getAllCategories);
router.get("/categories/:brand", tokenChecker, getOneCategory);
router.post("/add_category", checkAdminToken, singleFile, addCategory);
router.put("/update_category/:categoryId", checkAdminToken, singleFile, updateCategory);
router.delete("/delete_category/:categoryId", checkAdminToken, deleteCategory);

module.exports = router;
