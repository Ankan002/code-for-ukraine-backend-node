require('dotenv').config()
const User = require('../models/User')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')

exports.login = async(req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty){
        return res.status(400).json({
            success: false,
            errors: errors.array()
        })
    }

    const {name, providerId, image, email} = req.body

    try{
        const foundUser = await User.findOne({providerId})

        if(foundUser){
            const data = {
                user: foundUser._id
            }

            const authToken = jwt.sign(data, process.env.SECRET)

            return res.status(200).set({
                'authToken': authToken
            }).json({
                success: true,
                token: 'Check Response Headers with name authToken'
            })
        }

        const newUser = await User.create({
            name,
            providerId,
            image,
            email
        })

        const data = {
            user: newUser._id
        }

        const authToken = jwt.sign(data, process.env.SECRET)

        return res.status(200).set({
            'authToken': authToken
        }).json({
            success: true,
            token: 'Check Response Headers with name authToken'
        })
        
    }
    catch(error){
        console.log(error.message)
        res.status(500).json({
            success: false,
            message: 'Internal Server Error!!'
        })
    }
}