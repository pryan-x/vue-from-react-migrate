const express = require('express')
const router = express.Router()

// //authroute
// const authRoute = require('./api/auth')

// const userRoute = require('./api/user')

//ext api route
const igdbRoute = require('./igdb')

// //AUTH ROUTES
// router.use('/auth', authRoute)

// //RESTRICTED ROUTES
// router.use('/user', userRoute)


//EXTERNAL API ROUTES
router.use('/igdb', igdbRoute)

module.exports = router