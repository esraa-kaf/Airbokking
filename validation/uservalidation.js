const {body, check,param}=require("express-validator");
const User=require("../models/userModel")


/////////////////////////////////////////////////////////*******************************/////////////////////////////////////////////////
exports.validateNewUser=[
    body("name").notEmpty().withMessage(" لازم تدخل اسمك").isString().withMessage("name must string"),
    body("password").notEmpty().withMessage(" لازم تدخل كلمه المرور").isStrongPassword({
        minLength: 6,
        

      }).withMessage("كلمه المرور لازم تكون اكبر من 6 حروف او ارقام  "),


    body("phone").notEmpty().withMessage(" لازم تدخل رقمك").isNumeric().withMessage("لازم يكون ارقام بس").isLength(11).withMessage("لازم يكون 11 رقم"),
    check("phone").custom((value) => {
        return User.findOne( { phone: value }).then((user) => {
          if (user) {
            return Promise.reject("الرقم دا مستخدم قبل كدا ");
          }
        });
      }),
    check("email").custom((value) => {
      // console.log("valllll     ",value)
        return User.findOne( { email:value }).then((user) => {
          // console.log("eeeeeeeeeeee",user);

          if (user) {
            // console.log("user        ",user);
            return Promise.reject("الايميل مستخدم قبل كدا");
          }
          else{
            console.log("hhhhhhhhhhhhhh",user);
          }
        });
      })
   
    
]






















// exports.validateIdLength = (req, res, next) => {
//     const  _id  = req.params.id;
//     console.log(req.params);
//     console.log(_id.length);
//     // Define the desired length (e.g., 24 characters)
//     const desiredLength = 24;
  
//     if (_id.length !== desiredLength) {
//       return res.status(400).json({ success: false, message: `Invalid id length. It should be ${desiredLength} characters.` });
//     }
  
//     // If the id length is valid, proceed to the next middleware or route handler
//     next();
//   };