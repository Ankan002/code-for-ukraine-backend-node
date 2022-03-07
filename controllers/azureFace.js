require('dotenv').config()
const {validationResult} = require('express-validator')
const msRest = require('@azure/ms-rest-js')
const Face = require('@azure/cognitiveservices-face')
const processQueue = require('../helpers/processQueue')

const key = process.env.AZURE_FACE_VERIFY_API_KEY
const detectEndpoint = process.env.AZURE_FACE_DETECT_URL

//call azure face detect api. This returns a faceId which is required for the face verify api call
exports.detectFace = async(req, res) => {

    const errors = validationResult(req)

    if(!errors.isEmpty){
        return res.status(400).json({
            success: false,
            errors: errors.array()
        })
    }

    const imageByteArr = req.file;
    console.log(imageByteArr)
    
    try{
        const credentials = new msRest.ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key}});
        const client = new Face.FaceClient(credentials, endpoint);

        //TODO: currently we are storing image blobs directly in mongodb so will probably need to change this to client.face.detectWithStream instead and then convert images to byte array streams within this request
        //let results = await client.face.detectWithUrl({ url: imageUrl })
        let results = await client.face.detectWithStream(imageByteArr)
        console.log(results);

        res.status(200).json({
            faceId: results
        })
    }
    catch(error){
        console.error(error.message)
        res.status(500).json({
            success: false,
            message: 'Unable to detect face from imageUrl'
        })
    }
}

//calls azure face verify api which returns a boolean and confidence level to indicate whether to images supplied are a match
exports.verifyFace = async(req, res) => {

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
        const credentials = new msRest.ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key}});
        const client = new Face.FaceClient(credentials, endpoint);

        let results = await client.face.verifyFaceToFace({ faceId1: faceId1, faceId2: faceId2 });
        console.log(results);

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