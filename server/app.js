const express = require("express");
const app = express();
const cors = require('cors');
const { userRouter } = require("./routes/user");
const { categoryRouter } = require("./routes/category");
const { productRouter } = require("./routes/product");
const { cartRouter } = require("./routes/cart");


app.use(cors())
app.use(express.json())


//routes
app.use('/api/v1',userRouter)
app.use('/api/v1',categoryRouter)
app.use('/api/v1',productRouter)
app.use('/api/v1',cartRouter)

app.use('/testing',(req,res,next)=>{
    return res.status(200).json({
        success : true,
        message : 'Server Running Success'
    })
})


module.exports = { app };
