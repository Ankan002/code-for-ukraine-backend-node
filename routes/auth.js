const express = require('express')
const router = express.Router()
const {body} = require('express-validator')
const {login} = require('../controllers/auth')

router.post('/auth/login', [
    body('name').isLength({min: 3, max: 40}).withMessage('Name should be at least 3 to 40 characters long!!'),
    body('providerId').isLength({min: 1}).withMessage('Provider id is required!!'),
    body('image').isLength({min: 1}).withMessage('Image is required!!'),
    body('email').isEmail().withMessage('Valid Email is required!!'),
], login)



module.exports = router