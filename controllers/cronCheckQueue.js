const cron = require('node-cron')

const checkCheckQueue = () => {
    
    cron.schedule('* * * * *', function() {
        //TODO: check queue in mongo to see if there are any tasks in queue to process
        console.log('checking for Face Verify tasks in queue...')
    })
}

module.exports = cronCheckQueue