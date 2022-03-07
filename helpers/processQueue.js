const { getQueue } = require('../config/dbConnect')
var faceVerifyQueue = getQueue();

const processQueue = async() => {

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

module.exports = processQueue