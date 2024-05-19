const express = require('express');
const router = express.Router();
const Booking = require('../models/bookingModel');

// Create a new booking
exports.createNewBooking=async(req,res)=>{
    try {
    const {source,destination,date}=req.body; 
    const booking = new Booking({source,destination,date});
    await booking.save();
    res.status(201).send(booking);
  } catch (error) {
    res.status(400).send(error);
  }
}

exports.deleteBooking=async (req, res) => {
    try {
      const booking = await Booking.findByIdAndDelete(req.params.id);
      if (!booking) {
        return res.status(404).send();
      }
      res.send(booking);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  