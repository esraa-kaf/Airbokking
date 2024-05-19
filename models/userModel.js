const mongoose =require('mongoose')
const AutoIncrement = require("mongoose-sequence")(mongoose)

const userSchema = new mongoose.Schema({
    _id:{
        type:Number
     },
     
     email:{
        type:String,
        required:true,
        unique: true,
        index: true,
 
     },
     
    phone:{
        type:String,
        trim:true,
        // unique:true
       
        },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:8,
      
    },
    name: {
     type: String,
     required: true
  },

 


      
})
userSchema.plugin(AutoIncrement, { id: 'userCounter' });
const User = mongoose.model('user' ,userSchema )
module.exports=User