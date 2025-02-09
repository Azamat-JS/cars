const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    answer: {
        type: String,
        required: [true, "Please enter a comment"],
        min: [6, "Answer must be at least 6 characters"],
        max: [550, "Answer must be at most 550 characters"],
    },
    answeredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth",
        required: [true, "User must be provided"]
    }
},
{
    versionKey: false,
    timestamps: true
}
);

module.exports = mongoose.model("Answer", answerSchema)