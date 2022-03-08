const express = require('express')
const router = express.Router()
const {body, check} = require('express-validator')
const {fetchUser} = require('../middlewares/fetchUser')
const {detectFace, verifyFace} = require('../controllers/azureFace')
const req = require('express/lib/request')
const multer = require('multer');
const inMemoryStorage = multer.memoryStorage();
const uploadStrategy = multer({ storage: inMemoryStorage }).single('image');
//const upload = multer({storage: inMemoryStorage, limits: {fieldSize: 10 * 1024 * 1024}});

router.post('/detectFace', [fetchUser, uploadStrategy], [
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

router.post('/test', uploadStrategy, async (req, res) => {
    parseReqBody: false,
    //console.log(req.files.file.data)
    console.log('req.file: ' + req.file);
    console.log(req.body)
    res.json({file: req.file})
    //console.log(req.files['image'])
    //console.log(req.file.originalname)
})



module.exports = router