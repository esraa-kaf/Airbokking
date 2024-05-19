const express = require('express');
var bodyParser = require('body-parser')
const path=require("path")
const app = express();
app.use(express.json({limit: '25mb'}));

app.use(bodyParser.text({ limit: '5mb' })); // Parse text body with a limit of 5MB

// app.get("/",(req,res,next)=>{
//   return res.status(200).json({message:"welcome to my App airbooking"})
// })
const mongoose = require('mongoose')
require('dotenv').config()
const userRouter= require('./routes/userRouter') 
const bookingRouter=require('./routes/bookingRouter')
app.use([userRouter,bookingRouter])
// app.all('*',(req,res,next)=>{
//   res.status(404).send("in-valid routing")
// })
const User=require("./models/userModel")
const Booking =require("./models/bookingModel")
const authMw  =require('./middleware/authMw')








mongoose.connect('mongodb+srv://esraa:12345@esraakaf.vu1anyf.mongodb.net/airbooking')
.then(()=>{

    const PORT =process.env.PORT ||3000;
    app.listen(PORT,()=>{
    console.log(`app listening on port ${PORT}`)
  });
},
(error)=>{
  
  console.log(`DB connection error ${error.message}`)

})