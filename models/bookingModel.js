const mongoose =require('mongoose')
const AutoIncrement = require("mongoose-sequence")(mongoose)

const bookSchema = new mongoose.Schema({
    _id:{
        type:Number
     },
     
     source:{
        type:String,
        required:true,
        // index: true,
 
     },
     
    destination:{
        type:String,
        required:true
    }
 
    ,
    date:{
        type:String,
        required:true
    }



      
})
bookSchema.plugin(AutoIncrement, { id: 'bookingCounter' });
const Booking = mongoose.model('booking' ,bookSchema )
module.exports=Booking