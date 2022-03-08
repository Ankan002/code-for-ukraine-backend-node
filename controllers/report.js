require('dotenv').config()
const {validationResult} = require('express-validator')
const pushToQueue = require('../helpers/pushToQueue.js');
const processQueue = require('../helpers/processQueue');
const { detectFace } = require('./azureFace.js');
const Report = require('../models/Report.js');

exports.addReport = async(req, res)=> {

    const errors = validationResult(req)

    if(!errors.isEmpty){
        return res.status(400).json({
            success: false,
            errors: errors.array()
        })
    }

    const { missingName, missingImage, reporterId, reporterName, reporterImage, reporterEmail, notificationToken } = req.body
    console.log(req.body);

    try{
        //TODO:
        //retrieve all images from reports within a certain proximity
        //convert image from active report to byte array
        //convert all images retrieved from the database to byte arrays
        //call azure face detect api on all images to obtain faceIds
        //const faceId1 = detectFace()
        //push images to face verify queue in mongodb then immediately attempt to process task
        //pushToQueue(providerId, )
        //processQueue()
        var matchFound = false;

        //if no match is found add message to report database
        if (!matchFound){
            Report.create({
                missingName,
                missingImage,
                reporterId,
                reporterName,
                reporterImage,
                reporterEmail,
                notificationToken
            })
        }

        const message = matchFound ? 'Good news we have found a match!' : 'Your report has been submitted, Thank you'

        res.status(200).json({
            success: true,
            message: message
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

exports.getReports = async(req, res) => {
    const userId = req.user

    try{
        //TODO: right now we have no way to filter by location and will need to add coordinates to filter results based on proximity
        const reports = await Report.find();

        res.status(200).json({
            success: true,
            reports
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

