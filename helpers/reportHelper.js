const Report = require('../models/Report.js');

exports.retrieveReports = async() => {
        //TODO: right now we have no way to filter by location and will need to add coordinates to filter results based on proximity
        const reports = await Report.find();
}

exports.findMatch = () => {
        return false;
}

exports.addReport = async(missingName, missingImage, reporterId, reporterName, reporterImage, reporterEmail, notificationToken) => {
 
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