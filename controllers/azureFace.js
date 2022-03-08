require('dotenv').config()
const {validationResult} = require('express-validator')
const msRest = require('@azure/ms-rest-js')
const Face = require('@azure/cognitiveservices-face')

const key = process.env.AZURE_FACE_VERIFY_API_KEY
const credentials = new msRest.ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key}});
const endpoint = process.env.AZURE_FACE_ENDPOINT
const client = new Face.FaceClient(credentials, endpoint);

//call azure face detect api. This returns a faceId which is required for the face verify api call
exports.detectFace = async(req, res) => {

    const errors = validationResult(req)

    if(!errors.isEmpty){
        return res.status(400).json({
            success: false,
            errors: errors.array()
        })
    }
    
    try{
        const stream = req.file.buffer
        let results = await client.face.detectWithStream(stream)

        res.status(200).json({
            faceId: results.map (face => face.faceId)
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

    const {faceId1, faceId2} = req.body;
    console.log([faceId1, faceId2])

    try{
        let results = await client.face.verifyFaceToFace(faceId1, faceId2);
        console.log(results);

        res.status(200).json({
            success: true,
            match: results.isIdentical,
            confidence: results.confidence
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