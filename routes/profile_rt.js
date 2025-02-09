const router = require('express').Router()
const {getProfile, updateProfile, deleteProfile} = require('../controllers/profile')
const ImageUpload = require('../utils/multer')
const {tokenChecker} = require('../middleware/checkToken')

/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: User profile management endpoints
 */

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Profile]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       400:
 *         description: Bad request, user not found
 */

/**
 * @swagger
 * /updateProfile:
 *   put:
 *     summary: Update user profile
 *     tags: [Profile]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Bad request, user not found
 */

/**
 * @swagger
 * /deleteProfile:
 *   delete:
 *     summary: Delete user profile
 *     tags: [Profile]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Profile deleted successfully
 *       400:
 *         description: Bad request, user not found
 */


router.get('/profile', tokenChecker, getProfile)
router.put('/updateProfile', tokenChecker, ImageUpload.singleFile, updateProfile)
router.delete('/deleteProfile', tokenChecker, deleteProfile)

module.exports = router

