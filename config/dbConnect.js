require('dotenv').config()
const mongoose = require('mongoose')

const connectToDB = () => {

    //mongoose.connect(process.env.DB_URI ?? '', {
    mongoose.createConnection(process.env.DB_URI ?? '', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log(`Connected to DB`))
    .catch((error) => console.log(error))

}

module.exports = connectToDB
