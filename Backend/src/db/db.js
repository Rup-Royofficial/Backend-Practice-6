const mongoose = require('mongoose')

const DBConnection = async() => {
    try {
        console.log("Connecting to the database....")
        const connectionResponse = await mongoose.connect(process.env.MONGO_URI, { dbName: 'auth' })
        console.log(`Database connection established: ${connectionResponse.connection.host}`);
    } catch (error) {
        console.log(`Database connection failure: ${error.message}`)
        process.exit(1)
    }
}

module.exports = DBConnection