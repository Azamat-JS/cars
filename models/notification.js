const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    notification: {
       type: String,
       required: true
    }
},
{
    versionKey: false,
    timestamps: true
}
);

module.exports = mongoose.model("Notification", notificationSchema)