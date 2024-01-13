const mongoose = require('mongoose')
require('dotenv').config()

const dbUrl = process.env.DB_URI || ''


const connectDb = async ()=>{
    try {
        await mongoose.connect(dbUrl)
        .then(()=>{
            console.log('Mongoose Connected')
        })
    } catch (error) {
        setTimeout(connectDb,4000)
        console.log(`Mongoose Error : ${error.message}`)
    }
}

module.exports = {connectDb}