const app = require('./src/app')
const DBConnection = require('./src/db/db')


const port = process.env.PORT || 8080

DBConnection()
.then(() => {
    console.log('Trying to connect to server.....');
    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    })
})
.catch((error)=>{
    console.log(`Server is disconnected: ${error.message}`);
})