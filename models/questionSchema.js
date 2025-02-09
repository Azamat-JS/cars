const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Please enter a question"],
        min: [3, "Question length must be at least 6 characters"],
        max: [500, "Question length must be at most 500 characters"],
    },
    givenBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Auth",
        required:[true, 'User must be provided']
    }
},
{
    versionKey: false,
    timestamps: true
}
);

module.exports = mongoose.model("Question", questionSchema)