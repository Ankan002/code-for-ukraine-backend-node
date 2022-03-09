const { getQueue } = require('../config/dbConnect')
var faceVerifyQueue = getQueue();

//faceIds are only cached for 24 hours so push actual images to queue and call face detect api if over that time
exports.pushToQueue = async(providerId, faceId1, faceId2, image1, image2) => {

    const send = await faceVerifyQueue.add({
        taskId: providerId,
        faceId1: faceId1,
        faceId2: faceId2,
        image1: image1,
        image2: image2
    })

    console.log('items queued:', await faceVerifyQueue.count())

    await faceVerifyQueue.close();
}

exports.processQueue = async() => {

    do {
        qItem = await faceVerifyQueue.get((err, msg) => {
           const { taskId, faceId1, faceId2, image1, image2} = msg.payload;
           //TODO: process queue tasks by retrieving data from queue and running them through Azure Face Verify API
           
           //once the queue task has been processed delete it by calling ack
           faceVerifyQueue.ack(msg.ack, (err, id) => {
               console.log(`task ${taskId} has been deleted from the queue`)
           })
        })

    } while (qItem);
}

const cron = require('node-cron')

exports.cronCheckQueue = () => {
    
    cron.schedule('* * * * *', function() {
        //TODO: check queue in mongo to see if there are any tasks in queue to process
        console.log('checking for Face Verify tasks in queue...')
    })
}