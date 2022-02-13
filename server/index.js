const express = require('express'); 
const cors = require('cors');

const app =require("./connection/dbConnection");
const { polygonRouter } = require('./routes/polygonRoutes');
// const { pointRouter } = require('./routes/pointRoutes');

// const app = express()
//cors to enable any one access our API
app.use(cors("*"));
//body parsing
app.use(express.json())


//polygon APIs
app.use('/polygon',polygonRouter)

//point APIs
// app.use('/point', pointRouter)

//global error handler==> it must take 4 parameters
app.use((err,req,res,next)=>{
    if(err.status < 500) {
        return res.status(err.status).send(err.message)
    }
res.status(500).send("Internal Server error")
})



