const mongoose = require('mongoose')
const {Schema, model} = mongoose

const ReportSchema = new Schema({
    missingName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    missingImage: {
        type: String,
        required: true,
        trim: true
    },
    reporterId: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    reporterName: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    reporterImage: {
        type: String,
        required: true,
        trim: true
    },
    reporterEmail: {
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

module.exports = model('Report', ReportSchema)