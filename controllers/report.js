require('dotenv').config()
const {validationResult} = require('express-validator')
const { pushToQueue, processQueue } = require('../helpers/queueHelper.js');
const { detectFace } = require('./azureFace.js');
const Report = require('../models/Report.js');
const { retrieveReports, findMatch, addReport } = require('../helpers/reportHelper.js');

//this endpoint really just serves as an interation test by exposing an endpoint to add a record to the db. In prod user's will use reportMissing endpoint
exports.addReport = async(req, res)=> {

    const errors = validationResult(req)

    if(!errors.isEmpty){
        return res.status(400).json({
            success: false,
            errors: errors.array()
        })
    }

    const { missingName, missingImage, reporterId, reporterName, reporterImage, reporterEmail, notificationToken } = req.body

    try{
        addReport(missingName, missingImage, reporterId, reporterName, reporterImage, reporterEmail, notificationToken)

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
        retrieveReports();

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

exports.reportMissing = async(req, res) => {

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
        //retrieve all images from reports within a certain proximity
        var reports = retrieveReports();

        //TODO:
        //convert image from active report to byte array
        //convert all images retrieved from the database to byte arrays
        //call azure face detect api on all images to obtain faceIds
        //const faceId1 = detectFace()
        //push images to face verify queue in mongodb then immediately attempt to process task
        //pushToQueue(providerId, )
        //processQueue()
        var matchFound = findMatch();

        //if no match is found add message to report database
        if (!matchFound){
            addReport(missingName, missingImage, reporterId, reporterName, reporterImage, reporterEmail, notificationToken)
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

