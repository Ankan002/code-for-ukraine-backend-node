const mongoose = require('mongoose')
const {Schema, model} = mongoose

const UserSchema = new Schema({
    taskId: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    faceId1: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    faceId2: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
})

module.exports = model('FaceVerifyQueue', UserSchema)