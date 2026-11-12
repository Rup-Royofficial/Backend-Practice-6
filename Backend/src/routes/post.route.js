const express = require('express')
const authController = require('../controllers/user.controller')
const router = express.Router()

router.get('/user', authController.getUser)

module.exports = router