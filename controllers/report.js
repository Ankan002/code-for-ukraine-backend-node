require('dotenv').config()
const {validationResult} = require('express-validator')
const pushToQueue = require('../helpers/pushToQueue.js');
const processQueue = require('../helpers/processQueue');

exports.report = async(req, res)=> {

    const errors = validationResult(req)

    if(!errors.isEmpty){
        return res.status(400).json({
            success: false,
            errors: errors.array()
        })
    }

    const {findName, reporterName, providerId, image, email} = req.body

    try{
        //TODO:
        //retrieve all images from reports within a certain proximity
        //convert image from active report to byte array
        //convert all images retrieved from the database to byte arrays
        //call azure face detect api on all images to obtain faceIds
        //push images to face verify queue in mongodb then immediately attempt to process task
        pushToQueue(providerId, )
        processQueue()

        res.status(200).json({
            success: true,
            message: 'Your report has been submitted, Thank you'
        })
    }
    catch(error){
        console.error(error.message)
        res.status(500).json({
            success: false,
            message: 'Internal Server Error!!'
        })
    }
}

exports.verifyFace = async(req, res)=> {

    const key = process.env.AZURE_FACE_VERIFY_API_KEY
    const endpoint = process.env.AZURE_FACE_VERIFY_URL

    const errors = validationResult(req)

    if(!errors.isEmpty){
        return res.status(400).json({
            success: false,
            errors: errors.array()
        })
    }

    const {faceId1, faceId2} = req;
    console.log([faceId1, faceId2])


    try{
        //TODO: call azure face verify api here...
        const credentials = new msRest.ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key}});
        const client = new Face.FaceClient(credentials, endpoint);

        let results = await client.face.verifyFaceToFace({ faceId1: faceId1, faceId2: faceId2 });
        console.log(results);

        //TODO: this is a mock response. replace with actual deconstructed results
        res.status(200).json({
            success: true,
            match: true,
            confidence: ".89"
        })
    }
    catch(error){
        console.error(error.message)
        res.status(500).json({
            success: false,
            message: 'Internal Server Error!!'
        })
    }
}