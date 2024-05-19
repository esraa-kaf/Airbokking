const express=require('express')
router= express.Router()

const errorMW=require('../middleware/errorMw')
const authMw =require('../middleware/authMw')

const userController=require("../controller/userController")



const {validateNewUser,validateIdLength}=require("../validation/uservalidation")




// register add information (post)
router.post('/register' ,validateNewUser,errorMW,userController.createNewUser);
 //login
router.post('/login',userController.loginUser );

module.exports=router
