const mongoose = require("mongoose");
const  ObjectID = require('mongodb').ObjectId;

const bookingSchema =  mongoose.Schema({
  user : { type: String, ref: 'User' },
  flight : { type: String, ref: 'Flight' }
})

const BookingModel = mongoose.model("booking",bookingSchema)

module.exports={BookingModel}