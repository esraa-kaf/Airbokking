const express=require('express')
router= express.Router()

const bookingController=require("../controller/bookingController");
const errorMw = require('../middleware/errorMw');







// create new booking
router.post('/create-newBooking' ,errorMw,bookingController.createNewBooking);

// delete booking
router.delete('/delete/:id',bookingController.deleteBooking)
module.exports=router
