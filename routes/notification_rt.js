/**
 * @swagger
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       required:
 *         - notification
 *       properties:
 *         notification:
 *           type: string
 *           description: The notification message
 *           example: "New car added to the inventory!"
 */

const { Router } = require("express");
const { tokenChecker, checkAdminToken } = require("../middleware/checkToken");
const {
  getAllNotifications,
  getOneNotification,
  addNotification,
  updateNotification,
  deleteNotification,
} = require("../controllers/notification_ctr");

const router = Router();

/**
 * @swagger
 * /notifications:
 *   get:
 *     tags:
 *       - Notifications
 *     summary: Get all notifications
 *     description: Retrieve all notifications in the system.
 *     responses:
 *       200:
 *         description: List of notifications
 */

/**
 * @swagger
 * /notifications/{notificationId}:
 *   get:
 *     tags:
 *       - Notifications
 *     summary: Get a single notification
 *     description: Retrieve a single notification by its ID.
 *     parameters:
 *       - name: notificationId
 *         in: path
 *         required: true
 *         description: ID of the notification
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notification details
 *       404:
 *         description: Notification not found
 */

/**
 * @swagger
 * /create_notification:
 *   post:
 *     tags:
 *       - Notifications
 *     summary: Create a new notification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Notification'
 *     responses:
 *       201:
 *         description: Notification created successfully
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /notifications/{notificationId}:
 *   put:
 *     tags:
 *       - Notifications
 *     summary: Update a notification
 *     description: Admins can update an existing notification by ID.
 *     parameters:
 *       - name: notificationId
 *         in: path
 *         required: true
 *         description: ID of the notification to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Notification'
 *     responses:
 *       200:
 *         description: Notification updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Notification not found
 */

/**
 * @swagger
 * /notifications/{notificationId}:
 *   delete:
 *     tags:
 *       - Notifications
 *     summary: Delete a notification
 *     description: Admins can delete a notification by ID.
 *     parameters:
 *       - name: notificationId
 *         in: path
 *         required: true
 *         description: ID of the notification to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notification deleted successfully
 *       404:
 *         description: Notification not found
 */

router.get("/notifications", tokenChecker, getAllNotifications);
router.get("/notifications/:notificationId", tokenChecker, getOneNotification);
router.post("/create_notification", checkAdminToken, addNotification);
router.put("/notifications/:notificationId", checkAdminToken, updateNotification);
router.delete("/notifications/:notificationId", checkAdminToken, deleteNotification);

module.exports = router;