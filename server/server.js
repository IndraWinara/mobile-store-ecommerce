const {app} = require('./app')
require('dotenv').config()
const {connectDb} = require('./utils/db')

app.listen(process.env.PORT,()=>{
    console.log(`server running on port : ${process.env.PORT}`)
    connectDb()
})
