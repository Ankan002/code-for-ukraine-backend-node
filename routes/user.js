const express = require('express')
const router = express.Router()
const {fetchUser} = require('../middlewares/fetchUser')
const {getUser} = require('../controllers/user')

//GET Route for finding info about himself so it would be easily done by auth-token
router.get('/user', fetchUser, getUser)



module.exports = router