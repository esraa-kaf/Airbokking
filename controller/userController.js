
const express = require("express");
router=express.Router()
const User=require("../models/userModel")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer')




exports.createNewUser=async(req,res)=>{
    const {name,phone,email,password}=req.body;
    
    
       bcrypt.hash(password,8).then((hashpassword)=>{
        const user =new User({phone,password:hashpassword,name,email}) // res.body = information in postman
        const token = jwt.sign({ _id: user._id, email: user.email }, process.env.secretKey, { expiresIn: '24h' })
        // console.log("token", token);
        user._doc.token = token 
        user.save()   

        .then((user) =>{res.status(200).json({
          status_code:200,
          data:user,
        message:"تم انشاء الحساب بنجاح"
        })}) 
         // if it is not okay , show me error
        .catch((error)=>{res.status(500).json({          
          status_code:500,
          data:null,
          message:error.message
        })})
        
       });
      


}
///
exports.loginUser = async (req, res) => {
  // console.log("rrrr ",req)
  try {
    // Find the user by phonenumber
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    // Check if the user exists 
    if (user != null) {//user exist'
      //use bcrypt func (compare)=>(body password ,encrpted password )
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) { //user exist but we check password 
        throw new Error("بياناتك غير صحيحه")
      }
      // generate token



      else {
        const token = jwt.sign({ _id: user._id, email: user.email }, process.env.secretKey, { expiresIn: '24h' })
        // console.log("token", token);
      user._doc.token = token //set key to eng object at real time

        return res.json({
          success: true,
          data: user,
          message: 'تم تسجيل الدخول بنجاح',
          // token
        });

      }
    }
    else {//user not exist in DB
      throw new Error("بياناتك غير صحيحه")

    }

  } catch (error) {
    res.status(500).json({
      status_code: 500,
      data: null,
      message: error.message
    });
  }
};

