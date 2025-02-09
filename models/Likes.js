const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema({
    carId:{
        type:String,
        ref: 'Car',
        required: [true, 'Car Id must be provided']
    },
    userId: {
        type:String,
        ref: 'Auth',
        required: [true, 'User id must be provided']
    }
},
{
   versionKey:false,
   timestamps: true
})

module.exports = mongoose.model('Like', likeSchema)