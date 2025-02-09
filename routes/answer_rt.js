const { Router } = require("express");
const {
  createAnswer,
  getAllAnswers,
  getAllQuestions,
  writeQuestion,
} = require("../controllers/questionAndAnswer");
const { tokenChecker, checkAdminToken } = require("../middleware/checkToken");

const router = Router();

/**
 * @swagger
 * /answer:
 *   post:
 *     tags:
 *       - Answers
 *     summary: Create a new answer
 *     description: Allows a logged-in admin to submit an answer in JSON format.
 *     security:
 *       - BearerAuth: []  # Requires authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AnswerRequest'
 *     responses:
 *       201:
 *         description: Answer added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "answer added successfully"
 *                 answer:
 *                   $ref: '#/components/schemas/Answer'
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized (invalid or missing token)
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AnswerRequest:
 *       type: object
 *       properties:
 *         answer:
 *           type: string
 *           description: The content of the answer
 *           example: "This is a sample answer."
 *       required:
 *         - answer
 *     
 *     Answer:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier of the answer
 *           example: "65a2b3c4d5e6f7g8h9i0j1k2"
 *         answer:
 *           type: string
 *           description: The content of the answer
 *           example: "This is a sample answer."
 *         answeredBy:
 *           type: string
 *           description: The ID of the user who provided the answer
 *           example: "651f4b2e3e24b5a2c8f9e8d4"
 *       required:
 *         - id
 *         - answer
 *         - answeredBy

*/
router.post("/answer", checkAdminToken, createAnswer);
/**
 * @swagger
 * /answer:
 *   get:
 *     tags:
 *       - Answers
 *     summary: Get all answers
 *     description: Retrieves a list of all answers, sorted by creation date.
 *     security:
 *       - BearerAuth: []  # Requires authentication
 *     responses:
 *       200:
 *         description: A list of answers with the total count
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 answers:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Answer'
 *                 number:
 *                   type: integer
 *                   example: 10
 *       401:
 *         description: Unauthorized (invalid or missing token)
 *       500:
 *         description: Internal Server Error
 */
router.get("/answer", checkAdminToken, getAllAnswers);


/**
 * @swagger
 * components:
 *   schemas:
 *     Question:
 *       type: object
 *       required:
 *         - question
 *         - givenBy
 *       properties:
 *         question:
 *           type: string
 *           description: The question asked by the user
 *           minLength: 6
 *           maxLength: 500
 *         givenBy:
 *           type: string
 *           format: uuid
 *           description: The ID of the user who asked the question
 */

/**
 * @swagger
 * /question:
 *   get:
 *     tags:
 *       - Questions
 *     summary: Get all questions
 *     description: Retrieves all questions asked by users.
 *     responses:
 *       200:
 *         description: A list of all questions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Question'
 *       500:
 *         description: Internal Server Error
 */
router.get("/question", tokenChecker, getAllQuestions);

/**
 * @swagger
 * /question:
 *   post:
 *     tags:
 *       - Questions
 *     summary: Ask a new question
 *     description: Allows a logged-in user to ask a question.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Question'
 *     responses:
 *       201:
 *         description: Question was sent successfully
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Internal Server Error
 */
router.post("/question", tokenChecker, writeQuestion);


module.exports = router;
