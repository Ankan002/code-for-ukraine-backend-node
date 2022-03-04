const User = require('../models/User')

//A controller to get the user by the jwt access token. You need to be logged in to do so.
exports.getUser = async(req, res) => {
    const userId = req.user

    try{
        const user = await User.findById(userId)

        res.status(200).json({
            success: true,
            user
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