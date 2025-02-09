
const { Router } = require("express");
const router = Router();
const { register, verify, login, logOut } = require("../controllers/auth_ctr");
const {
  authValidate,
  verifyValidate,
  loginValidate,
} = require("../middleware/authValidMiddle");
const refresh = require("../middleware/refreshToken");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, email, password, role]
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: Verification code sent to email
 *       400:
 *         description: Email already exists
 */

/**
 * @swagger
 * /verify:
 *   post:
 *     summary: Verify user with code
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, code]
 *             properties:
 *               email:
 *                 type: string
 *               code:
 *                 type: string
 *     responses:
 *       200:
 *         description: User verified successfully
 *       400:
 *         description: Invalid code or user not found
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in user
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Invalid credentials or user not verified
 */

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Log out user
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *       - RefreshCookie: []
 *     responses:
 *       200:
 *         description: User logged out successfully
 */


router.post("/register", authValidate, register);
router.post("/verify", verifyValidate, verify);
router.post("/login", loginValidate, login);
router.post("/refresh", refresh);
router.post("/logout", logOut);

module.exports = router;
