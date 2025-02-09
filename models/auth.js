const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter a username"],
        min: [3, "Username must be at least 6 characters"],
        max: [55, "Username must be at most 55 characters"],
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
        min: [6, "Email must be at least 6 characters"],
        max: [55, "Email must be at most 55 characters"],
    },
    password: {
        type: String,
        required: [true, "Please enter a passowrd"],
        min: [6, "password must be at least 6 characters"],
    },
    role:{
        type: String,
        default: "user",
        enum: {
            values: ["user", "admin"],
            message: "{VALUE} is not supported",
        },
    },
    verfication_code: {
        type: String,
        required: [true, "Please enter a verfication_code"],
    },
    isVerify: {
        type: Boolean,
        default: false,
    },
    image:{
        type:String
    }
});

module.exports = mongoose.model("Auth", authSchema);