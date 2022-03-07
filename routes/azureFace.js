const express = require('express')
const router = express.Router()
const {body, check} = require('express-validator')
const {fetchUser} = require('../middlewares/fetchUser')
const {detectFace, verifyFace} = require('../controllers/azureFace')
const req = require('express/lib/request')
const multer = require('multer')
const upload = multer()

router.post('/detectFace', [fetchUser, upload.single('image')], [
    check('image')
        .notEmpty().withMessage('Image is required')
        .custom((value, { req }) => {
            if (!req.file) throw new Error("Image is required");
        })
], detectFace)

//this is for test purposes only. The face varify api will be called from a
//lamda function from a listener connected to an azure queue
router.post('/verifyFace', fetchUser, [
    body('faceId1').isLength({min: 3, max: 40}).withMessage('Please enter azure faceId1'),
    body('faceId2').isLength({min: 3, max: 40}).withMessage('Please enter azure faceId2'),
], verifyFace)



module.exports = router