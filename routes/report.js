const express = require('express')
const router = express.Router()
const {body} = require('express-validator')
const { fetchUser } = require('../middlewares/fetchUser')
const { addReport, getReports, reportMissing } = require('../controllers/report')

router.post('/report/addReport', fetchUser, [
    body('missingName').isLength({min: 3, max: 40}).withMessage('Name should be at least 3 to 40 characters long!!'),
    body('missingImage').isLength({min: 1}).withMessage('Image is required!!'),
    body('reporterId').isLength({min: 1}).withMessage('Provider id is required!!'),
    body('reporterName').isLength({min: 3, max: 40}).withMessage('Name should be at least 3 to 40 characters long!!'),
    body('reporterImage').isLength({min: 1}).withMessage('Image is required!!'),
    body('reporterEmail').isEmail().withMessage('Valid Email is required!!'),
    body('notificationTokens').isLength({min: 1, max: 40}).withMessage("Notification token is required")
], addReport)

router.get('/report/getReports', fetchUser, getReports)

router.post('/report/reportMissing', fetchUser, [
    body('missingName').isLength({min: 3, max: 40}).withMessage('Name should be at least 3 to 40 characters long!!'),
    body('missingImage').isLength({min: 1}).withMessage('Image is required!!'),
    body('reporterId').isLength({min: 1}).withMessage('Provider id is required!!'),
    body('reporterName').isLength({min: 3, max: 40}).withMessage('Name should be at least 3 to 40 characters long!!'),
    body('reporterImage').isLength({min: 1}).withMessage('Image is required!!'),
    body('reporterEmail').isEmail().withMessage('Valid Email is required!!'),
    body('notificationTokens').isLength({min: 1, max: 40}).withMessage("Notification token is required")
], reportMissing)


module.exports = router