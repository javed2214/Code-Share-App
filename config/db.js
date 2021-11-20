const mongoose = require('mongoose')
const MONGO_URI = 'mongodb://localhost/editor'

const connectMongoDB = () => {
    mongoose.connect(MONGO_URI, (err) => {
        if(err) console.log('Error in DB Connectivity!', err)
        else console.log('DB Connected Successfully!')
    })
}

module.exports = connectMongoDB