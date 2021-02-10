const express = require('express')
const router = express.Router()

const igdb = require('../../controllers/igdb')


router.get('/homepagedata', igdb.homepage)
router.get('/gamepagedata', igdb.gamepage)


module.exports = router