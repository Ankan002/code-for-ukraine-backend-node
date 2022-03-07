require('dotenv').config()
const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const connectToDB = require('./config/dbConnect')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const reportRoutes = require('./routes/report')
const connectToQueue = require('./config/queueConnect')
const checkFaceVerifyQueue = require('./controllers/cronCheckQueue')

const startServer = () => {
    const app = express()
    const PORT = process.env.PORT

    connectToDB()
    connectToQueue()

    app.use(cors())
    app.use(express.json())
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

    app.listen(PORT, () => console.log(`App is running at ${PORT}`))
}

module.exports = startServer