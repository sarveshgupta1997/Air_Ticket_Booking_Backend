const express = require("express");
const {BookingModel} = require("../Models/BookingModel");

const bookingRouter = express.Router();

//Register
bookingRouter.post("/", async (req,res)=>{
    let payload = req.body;
    try {
        let booking = new BookingModel(payload)
        await booking.save();
        res.status(201).send({msg:"Booking Registered",booking});
    } catch (error) {
        res.send({err:"Something went wrong"});
        console.log(error)
    }
})


module.exports={bookingRouter};