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