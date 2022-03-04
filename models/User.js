const mongoose = require('mongoose')
const {Schema, model} = mongoose

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    providerId: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    image: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    notificationTokens: {
        type: [String],
        default: []
    }
}, {
    timestamps: true
})

module.exports = model('User', UserSchema)