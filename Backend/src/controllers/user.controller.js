const dbModel = require('../models/user.models')
const jwt = require('jsonwebtoken')

const createUser = async(req,res) => {
    try {
        const { username, email, password } = req.body
        
        const checkEmail = await dbModel.findOne({ email: email })
        if(checkEmail) return res.status(409).send("Email already exists")

        const user = await dbModel.create({
            username: username,
            email: email,
            password: password
        })

        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET)

        res.cookie("token", token)
        console.log(user)
        res.status(201).send({
            message: "User created succesfully",
            user
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).send(`Error while creating user: ${error.message}`)
    }
}

const getUser = async(req,res) => {
    try {
        const token = req.cookies.token
        let decoded = null
        if(!token) return res.status(401).send({
            message: "Unauthorized",
        })

        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET)
            console.log(decoded)
        } catch (error) {
            return res.status(401).send({
                message: "Unauthorised"
            })
        }
        const user = await dbModel.findOne({ _id: decoded.id })
        res.status(200).send(user)
    } catch (error) {
        console.log(error.message)
        res.status(500).send(`Error while fetching user info: ${error.message}`)
    }
}

module.exports = { createUser, getUser }