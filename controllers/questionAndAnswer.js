const Answer = require('../models/answer');
const Question = require('../models/questionSchema')

const getAllQuestions = async(req, res) => {
    const questions = await Question.find().sort('createdAt').populate('givenBy', '-_id, username')
    res.status(200).json(questions)
}

const writeQuestion = async(req, res) => {
    req.body.givenBy = req.user.userId;
    const question = await Question.create(req.body);
    res.status(201).json({ question, message: 'Question was sent successfully' });
}

const getAllAnswers = async(req, res) => {
    const answers = await Answer.find().sort('createdAt').populate('answeredBy', '-_id, username')
    res.status(200).json({answers: answers, number: answers.length})
}

const createAnswer = async (req, res) => {
    req.body.answeredBy = req.user.userId;
    const answer = await Answer.create(req.body);
    res.status(201).json({
        msg: "answer added successfully",
        answer});
};


module.exports = {createAnswer, getAllAnswers, getAllQuestions, writeQuestion}