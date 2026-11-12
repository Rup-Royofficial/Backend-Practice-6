const express = require('express')
const authController = require('../controllers/user.controller')
const router = express.Router()


// router.get('/user')
router.post('/register', authController.createUser)

module.exports = router 