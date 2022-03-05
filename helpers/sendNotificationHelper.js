const {Expo} = require('expo-server-sdk')

//We expect an array of push notifications to be passed as an argument also title and body of the message needs to be passed on as an argument
exports.sendNotificationHelper = async(tokens, title, body) => {
    if(tokens.length === 0){
        return{
            success: false,
            message: 'No valid notification token'
        }
    }
    
    const expo = new Expo()

    const messages = []

    for(let token of tokens){
        if (!Expo.isExpoPushToken(token)) {
            console.error(`Push token ${token} is not a valid Expo push token`);
            continue;
        }

        messages.push({
            to: token,
            sound: 'default',
            title: title,
            body: body,
            data: { data: 'goes here' },
            priority: 'high'
        })
    }

    if(messages.length === 0){
        return{
            success: false,
            message: 'No valid notification token'
        }
    }

    let notificationChunks = expo.chunkPushNotifications(messages)
    let tickets = []

    for(let notificationChunk of notificationChunks){
        try{
            let ticketChunk = await expo.sendPushNotificationsAsync(notificationChunk)
            console.log(ticketChunk)
            tickets.push(ticketChunk)
        }
        catch(error){
            console.log(error)
        }
    }

    return{
        success: true,
        issuedTickets: tickets
    }
}