require('dotenv').config()
const jwt = require('jsonwebtoken')

exports.fetchUser = async(req, res, next) => {
    
    try{
        const token = req.header('auth-token')
    
        if(!token){
            res.status(401).json({
                success: false,
                message: 'Unauthorized Access!!'
            })
        }

        const data = jwt.verify(token, process.env.SECRET)
        
        req.user = data.user
        next()
    }
    catch(error){
        console.log(error.message)
        res.status(500).json({
            success: false,
            message: 'Internal Server Error!!'
        })
    }
}