const { Router } = require("express");
const pressLike = require("../controllers/likes");
const {tokenChecker} = require('../middleware/checkToken')

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Likes
 *   description: Like management endpoints
 */

/**
 * @swagger
 * /like:
 *   post:
 *     summary: Like or unlike a car
 *     tags: [Likes]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [carId]
 *             properties:
 *               carId:
 *                 type: string
 *                 description: The ID of the car to like or unlike
 *     responses:
 *       201:
 *         description: Car liked successfully
 *       200:
 *         description: Car unliked successfully
 *       500:
 *         description: Internal server error
 */


router.post("/like", tokenChecker, pressLike);

module.exports = router;
