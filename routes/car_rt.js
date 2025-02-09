
const express = require("express");
const router = express.Router();
const { tokenChecker, checkAdminToken } = require("../middleware/checkToken");
const {fileUploader} = require('../utils/multer')
const {
  getAllCars,
  getSingleCar,
  addCar,
  updateCar,
  deleteCar,
} = require("../controllers/cars");

/**
 * @swagger
 * tags:
 *   name: Cars
 *   description: Car management endpoints
 */

/**
 * @swagger
 * /get_cars:
 *   get:
 *     summary: Get all cars
 *     tags: [Cars]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: model
 *         schema:
 *           type: string
 *         description: Filter by car model
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort results
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *         description: Select specific fields
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Limit results per page
 *     responses:
 *       200:
 *         description: A list of cars
 */

/**
 * @swagger
 * /get_one_car/{carId}:
 *   get:
 *     summary: Get a single car by ID
 *     tags: [Cars]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: carId
 *         required: true
 *         schema:
 *           type: string
 *         description: The car ID
 *     responses:
 *       200:
 *         description: A car object
 *       404:
 *         description: Car not found
 */

/**
 * @swagger
 * /add_car:
 *   post:
 *     summary: Add a new car
 *     tags: [Cars]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [model, price, engine, year, category, distance, tinting, color, description]
 *             properties:
 *               model:
 *                 type: string
 *               price:
 *                 type: number
 *               engine:
 *                 type: number
 *               year:
 *                 type: number
 *               category:
 *                 type: string
 *               distance:
 *                 type: number
 *               tinting:
 *                 type: string
 *                 enum: [yes, no]
 *               color:
 *                 type: string
 *               description:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Car added successfully
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /update_car/{carId}:
 *   put:
 *     summary: Update an existing car
 *     tags: [Cars]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: carId
 *         required: true
 *         schema:
 *           type: string
 *         description: The car ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               model:
 *                 type: string
 *               price:
 *                 type: number
 *               engine:
 *                 type: number
 *               year:
 *                 type: number
 *               category:
 *                 type: string
 *               distance:
 *                 type: number
 *               tinting:
 *                 type: string
 *                 enum: [yes, no]
 *               color:
 *                 type: string
 *               description:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Car updated successfully
 *       404:
 *         description: Car not found
 */

/**
 * @swagger
 * /delete_car/{carId}:
 *   delete:
 *     summary: Delete a car
 *     tags: [Cars]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: carId
 *         required: true
 *         schema:
 *           type: string
 *         description: The car ID
 *     responses:
 *       200:
 *         description: Car deleted successfully
 *       404:
 *         description: Car not found
 */


router.get("/get_cars", tokenChecker, getAllCars);
router.get("/get_one_car/:carId", tokenChecker, getSingleCar);
router.post("/add_car", checkAdminToken, fileUploader, addCar);
router.put("/update_car/:carId", checkAdminToken,fileUploader, updateCar);
router.delete("/delete_car/:carId", checkAdminToken, deleteCar);

module.exports = router;
