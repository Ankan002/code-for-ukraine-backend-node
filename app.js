require('dotenv').config()
const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const { connectToDB } = require('./config/dbConnect')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const reportRoutes = require('./routes/report')
const azureFaceRoutes = require('./routes/azureFace')
const cronCheckQueue = require('./helpers/cronCheckQueue')
const bodyParser = require('body-parser');

const startServer = () => {
    const app = express()
    const PORT = process.env.PORT

    connectToDB()

    app.use(cors())
    app.use(express.json())
    app.use(bodyParser.raw({type: "application/octet-stream", limit: '50mb'}))
    app.use(fileUpload({
        useTempFiles: true
    }))

    //sets up cron job to run every minute to check Face Verify queue
    cronCheckQueue()

    app.get('/', (req, res) => {
        res.status(200).json({
            message: 'Welcome to Code For Ukraine API'
        })
    })

    app.use('/api', authRoutes)
    app.use('/api', userRoutes)
    app.use('/api', reportRoutes)
    app.use('/api', azureFaceRoutes)

    app.listen(PORT, () => console.log(`App is running at ${PORT}`))
}

module.exports = startServer