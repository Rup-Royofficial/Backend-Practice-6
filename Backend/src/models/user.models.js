const mongoose = require('mongoose')

const dbSchema = new mongoose.Schema({
    username: String,
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: String
})

const dbModel = mongoose.model('User', dbSchema)
module.exports = dbModel