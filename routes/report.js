const express = require('express')
const router = express.Router()
const {body} = require('express-validator')
const {fetchUser} = require('../middlewares/fetchUser')
const {report} = require('../controllers/report')
const {verifyFace} = require('../controllers/report')

router.post('/report', fetchUser, [
    body('findName').isLength({min: 3, max: 40}).withMessage('Name should be at least 3 to 40 characters long!!'),
    body('reporterName').isLength({min: 3, max: 40}).withMessage('Name should be at least 3 to 40 characters long!!'),
    body('providerId').isLength({min: 1}).withMessage('Provider id is required!!'),
    body('image').isLength({min: 1}).withMessage('Image is required!!'),
    body('email').isEmail().withMessage('Valid Email is required!!'),
], report)



module.exports = router