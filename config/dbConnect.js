require('dotenv').config()
const mongoose = require('mongoose')
var mongoDbQueue = require('mongodb-queue')

var db;
var faceVerifyQueue;

const connectToDB = () => {

    mongoose.connect(process.env.DB_URI ?? '', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        db = mongoose.connection.db;
        faceVerifyQueue = mongoDbQueue(db, 'face-verify-queue');
        console.log(db);
        console.log(`Connected to DB`)
    })
    .catch((error) => console.log(error))
}

const getDB = () => {
    return db;
}

const getQueue = () => {
    return faceVerifyQueue;
}

module.exports = { connectToDB, getDB, getQueue }
