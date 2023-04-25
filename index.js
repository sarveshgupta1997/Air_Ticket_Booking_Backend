const express = require("express");
const connection = require("./Config/db");
const {UserModel} = require("./Models/UserModel");
const {FlightModel} = require("./Models/FlightModel");
const {BookingModel} = require("./Models/BookingModel");
const {flightRouter} = require("./Routes/flightRouter");
const {bookingRouter} = require("./Routes/bookingRouter");
const {authenticator} = require("./Middlewares/authenticator");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
require("dotenv").config();

const app = express();
app.use(express.json());

app.use("/api/flights",flightRouter);
app.use("/api/booking",bookingRouter);
// app.use("/api/dashboard",bookingRouter);

app.get("/",(req,res)=>{
    res.send("Air Ticket Booking - Base Api Endpoint")
})

//Register
app.post("/api/register", async (req,res)=>{
    let {name,email,password} = req.body;
    try {
        bcrypt.hash(password, +process.env.salt, async function(err, hash) {
            if(err){
                res.send({err:"Something went wrong"});
                console.log(err)
            }else{
                let user = new UserModel({name,email,password:hash})
                await user.save();
                res.status(201).send({msg:"User Registered",user});
            }
        });
    } catch (error) {
        res.send({err:"Something went wrong"});
        console.log(error)
    }
})

//Login
app.post("/api/login", async (req,res)=>{
    let {email,password} = req.body;
    try {        
        let user = await UserModel.findOne({email});
        if(user){
            bcrypt.compare(password, user.password, async function(err, result) {
                if(result){
                    var token = jwt.sign({ userID: user._id }, process.env.secret);
                    res.send({msg:"Login Sucess",user,token});
                }else{
                    res.send({err:"Wrong Credentials"});
                }
            });
        }else{
            res.send({err:"User Not found"});
        }
    } catch (error) {
        res.send({err:"Something went wrong"});
        console.log(error)
    }
})

// Booking Create
app.post("/api/booking", async (req,res)=>{
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

// Dashboard
app.get("/api/dashboard", async (req,res)=>{
    let payload = req.body;
    try {
        let bookings = await BookingModel.find();
        res.status(200).send({msg:"All Bookings",bookings});
    } catch (error) {
        res.send({err:"Something went wrong"});
        console.log(error)
    }
})


app.use(authenticator);
app.use("/test",(req,res)=>{
    res.send(req.body)
})

app.listen(process.env.PORT,async ()=>{
    console.log("Server running at "+process.env.PORT)
    try {
        await connection;
        console.log("Connected to db")
    } catch (error) {
        console.log(error)
    }
})